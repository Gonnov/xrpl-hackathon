import React, { useState } from "react";
import { Field } from "./Field";
import { BillOfLadingData } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface BillOfLadingProps {
  data: BillOfLadingData;
  discrepancies?: string[];
}

export const BillOfLading: React.FC<BillOfLadingProps> = ({
  data,
  discrepancies = [],
}) => {
  const [showCorrectionDialog, setShowCorrectionDialog] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<{
    field: string;
    message: string;
    suggestion?: string;
  } | null>(null);
  const [correctionValue, setCorrectionValue] = useState("");

  const isDiscrepancy = (field: string) => discrepancies.includes(field);

  const handleShowCorrection = (issue: typeof selectedIssue) => {
    setSelectedIssue(issue);
    setCorrectionValue(issue?.suggestion || "");
    setShowCorrectionDialog(true);
  };

  const handleApplyCorrection = () => {
    // In a real application, this would update the data
    // For now, we'll just close the dialog
    setShowCorrectionDialog(false);
  };

  return (
    <div className="w-full bg-white text-gray-900 text-sm leading-relaxed space-y-6">
      {/* Disclaimer */}
      <div className="text-xs italic text-gray-500 px-6 pt-4">
        {data.header?.disclaimer || "-"}
      </div>

      {/* Top bar */}
      <div className="px-6 flex items-center justify-between">
        <div className="font-bold text-base">
          {data.billInfo?.type || "Sea EB/L Nº"} –{" "}
          {data.billInfo?.copyType || "Negotiable Copy"}
        </div>
        <span className="text-xs text-gray-600">
          {data.billInfo?.subtitle || ""}
        </span>
      </div>

      {/* Header section */}
      <div className="mx-6 border border-gray-200 rounded shadow-sm p-6 grid grid-cols-2 gap-6">
        {/* Logo + Company */}
        <div className="flex gap-4">
          <img
            src={data.header?.companyLogo || ""}
            alt={data.header?.companyName || "Company Logo"}
            className="w-24 h-16 object-contain"
          />
          <div>
            <div className="font-semibold text-sm">
              {data.header?.companyName || "-"}
            </div>
            <div className="text-xs text-gray-700 mt-1">
              {data.header?.companyAddress || "-"}
              <br />
              {data.header?.companyContact || "-"}
            </div>
          </div>
        </div>

        {/* EB/L references */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <Field
            label="NUMÉRO & SEQUENCE OF EB/L"
            value={data.billInfo?.number || "-"}
            fieldKey="eblNumber"
            isDiscrepancy={isDiscrepancy("eblNumber")}
            errorMessage="Invalid sequence"
          />
          <Field
            label="NO OF RIDER PAGES"
            value={data.billInfo?.riderPages || "-"}
            fieldKey="riderPages"
          />
          <Field
            label="CARRIER'S AGENTS ENDORSEMENTS : (Include Agen(s)s at POD)"
            value={data.billInfo?.agentEndorsements || "-"}
            fieldKey="agentEndorsements"
          />
          <Field
            label="PORT OF DISCHARGE AGENT ENDORSEMENT"
            value={data.billInfo?.dischargeEndorsement || "-"}
            fieldKey="dischargeEndorsement"
          />
        </div>
      </div>

      {/* Parties */}
      <div className="mx-6 border border-gray-200 rounded shadow-sm p-6 grid grid-cols-3 gap-6">
        {/* Shipper */}
        <div>
          <Field
            label="SHIPPER"
            value={data.shipper?.name || "-"}
            fieldKey="shipperName"
            isDiscrepancy={isDiscrepancy("shipperName")}
          />
          <div className="text-xs mt-1">
            {data.shipper?.address || "-"}
            <br />
            {data.shipper?.contact || "-"}
          </div>
        </div>

        {/* Consignee */}
        <div>
          <Field
            label="CONSIGNEE"
            value={data.consignee?.name || "-"}
            fieldKey="consigneeName"
          />
          <div className="text-xs mt-1">{data.consignee?.address || "-"}</div>
        </div>

        {/* Notify */}
        <div>
          <Field
            label="NOTIFY PARTY"
            value={data.notifyParty?.name || "-"}
            fieldKey="notifyPartyName"
          />
          <div className="text-xs mt-1">
            {data.notifyParty?.address || "-"}
            <br />
            {data.notifyParty?.contact || "-"}
          </div>
        </div>

        {/* Freight Forwarder */}
        <div className="col-span-3">
          <Field
            label="FREIGHT FORWARDER"
            value={data.forwarder?.name || "-"}
            fieldKey="forwarderName"
          />
        </div>
      </div>

      {/* Transport */}
      <div className="mx-6 border border-gray-200 rounded shadow-sm p-6 grid grid-cols-3 gap-6 text-xs">
        {/* Vessel + Voyage */}
        <Field
          label="VESSEL AND VOYAGE NO"
          value={data.transport?.vesselNumber || "-"}
          fieldKey="vesselNumber"
          isDiscrepancy={isDiscrepancy("vesselNumber")}
          errorMessage="Mismatch with booking"
        />

        {/* Port of Loading + ShippedOnBoardDate */}
        <Field
          label="PORT OF LOADING"
          value={`${
            data.transport?.portOfLoading || "-"
          }${data.transport?.shippedOnBoardDate ? `, ${data.transport.shippedOnBoardDate}` : ""}`}
          fieldKey="portOfLoading"
        />

        {/* Place of Receipt */}
        <Field
          label="PLACE OF RECEIPT"
          value={data.transport?.placeOfReceipt || "-"}
          fieldKey="placeOfReceipt"
        />

        {/* Booking / Shipper's Ref */}
        <Field
          label="BOOKING REF. (or) SHIPPER'S REF"
          value={data.transport?.bookingReference || "XXXXXXXXXX"}
          fieldKey="bookingReference"
        />

        {/* Port of Discharge */}
        <Field
          label="PORT OF DISCHARGE"
          value={data.transport?.portOfDischarge || "-"}
          fieldKey="portOfDischarge"
        />

        {/* Place of Delivery */}
        <Field
          label="PLACE OF DELIVERY"
          value={data.transport?.placeOfDelivery || "-"}
          fieldKey="placeOfDelivery"
        />
      </div>

      {/* Cargo */}
      <div className="mx-6 border border-gray-200 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 text-center font-semibold py-2 text-xs border-b border-gray-200">
          PARTICULARS FURNISHED BY THE SHIPPER – NOT CHECKED BY CARRIER – CARRIER NOT RESPONSIBLE (SEE CLAUSE 14)
        </div>
        <div className="grid grid-cols-4 text-xs font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">
          <div className="p-3 border-r border-gray-200">
            CONTAINER NUMBERS, SEAL NUMBERS AND MARKS
          </div>
          <div className="p-3 border-r border-gray-200">
            DESCRIPTION OF PACKAGES AND GOODS
          </div>
          <div className="p-3 border-r border-gray-200">GROSS CARGO WEIGHT</div>
          <div className="p-3">MEASUREMENT</div>
        </div>
        <div className="grid grid-cols-4 text-sm">
          <div className="p-3 border-r border-gray-200">
            {data.cargo
              ? [...data.cargo.containerNumbers, ...data.cargo.sealNumbers].join(
                  ", "
                )
              : "-"}
          </div>
          <div 
            className={`p-3 border-r border-gray-200 whitespace-pre-line relative ${
              data.cargo?.complianceIssues?.some(i => i.field === "description") 
                ? "bg-red-50" 
                : ""
            }`}
          >
            {data.cargo?.complianceIssues?.some(i => i.field === "description") && (
              <button
                onClick={() => handleShowCorrection(data.cargo?.complianceIssues?.find(i => i.field === "description") || null)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              >
                <AlertTriangle className="w-4 h-4" />
              </button>
            )}
            {data.cargo
              ? `${data.cargo.quantity} × ${data.cargo.packageType}\n${data.cargo.description}`
              : "-"}
          </div>
          <div className="p-3 border-r border-gray-200">
            <Field
              value={data.cargo?.grossWeight || "-"}
              fieldKey="grossWeight"
              isDiscrepancy={isDiscrepancy("grossWeight")}
            />
          </div>
          <div className="p-3">{data.cargo?.measurement || "-"}</div>
        </div>
      </div>

      {/* Freight & Declaration */}
      <div className="mx-6 border border-gray-200 rounded shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 text-xs font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">
          <div className="p-3 border-r border-gray-200">FREIGHT OF CHARGES</div>
          <div className="p-3 border-r border-gray-200">BASIS</div>
          <div className="p-3 border-r border-gray-200">RATE</div>
          <div className="p-3 border-r border-gray-200">PREPAID</div>
          <div className="p-3">COLLECT</div>
        </div>
        <div className="grid grid-cols-5 text-sm">
          <div className="p-3 border-r border-gray-200">
            {data.charges?.freightOfCharges || "-"}
          </div>
          <div className="p-3 border-r border-gray-200">
            {data.charges?.basis || "-"}
          </div>
          <div className="p-3 border-r border-gray-200">
            {data.charges?.rate || "-"}
          </div>
          <div className="p-3 border-r border-gray-200">
            {data.charges?.prepaid || "-"}
          </div>
          <div className="p-3">{data.charges?.collect || "-"}</div>
        </div>
      </div>

      {/* Signature + Déclarations */}
      <div className="mx-6 border border-gray-200 rounded shadow-sm overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-3 text-xs font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">
          <div className="p-3 border-r border-gray-200">
            DECLARED VALUES <br />
            <span className="font-normal">
              (Only applicable if Ad Valorem charges paid – see Clause 7.3)
            </span>
          </div>
          <div className="p-3 border-r border-gray-200">
            CARRIER'S RECEIPT <br />
            <span className="font-normal">
              (No. of Cntrs or Pkgs rcvd by Carrier – see Clause 14.1)
            </span>
          </div>
          
          {/* SIGNED cell merged visually over 2 rows */}
          <div className="p-3 row-span-2">
            SIGNED <br />
            <span className="font-normal">On behalf of the Carrier CMA CGM</span>
            <br />
            <span className="font-semibold">{data.signature?.signedBy || "-"}</span>
          </div>
        </div>

        {/* Content row */}
        <div className="grid grid-cols-3 text-sm border-b border-gray-200">
          <div className="p-3 border-r border-gray-200">
            {data.declarations?.declaredValue || "-"}
          </div>
          <div className="p-3 border-r border-gray-200">
            {data.carrierReceipt?.receivedUnits || "-"}
          </div>
          <div className="p-3" />
        </div>

        {/* Footer row */}
        <div className="grid grid-cols-3 text-xs font-semibold text-gray-600 bg-gray-50 border-t border-gray-200">
          <div className="p-3 border-r border-gray-200">PLACE AND DATE OF ISSUE</div>
          <div className="p-3 border-r border-gray-200">SHIPPED ON BOARD DATE</div>
          <div className="p-3" />
        </div>

        {/* Final row */}
        <div className="grid grid-cols-3 text-sm">
          <div className="p-3 border-r border-gray-200">
            {data.signature?.place && data.signature?.date
              ? `${data.signature.place}, ${data.signature.date}`
              : "-"}
          </div>
          <div className="p-3 border-r border-gray-200">
            {data.transport?.shippedOnBoardDate || "-"}
          </div>
          <div className="p-3" />
        </div>
      </div>

      {/* Correction Dialog */}
      <Dialog open={showCorrectionDialog} onOpenChange={setShowCorrectionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Document Compliance Issue</DialogTitle>
            <DialogDescription>
              {selectedIssue?.message}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    AI Suggestion
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {selectedIssue?.suggestion}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Edit Correction
              </label>
              <Textarea
                value={correctionValue}
                onChange={(e) => setCorrectionValue(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCorrectionDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApplyCorrection}
              className="bg-[#00B0F5]"
            >
              Apply Correction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};