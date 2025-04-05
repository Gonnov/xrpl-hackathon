import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import { DocumentStepper } from "../NewBl/sections/DocumentStepper";
import { WorkflowNavigation } from "@/components/WorkflowNavigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
    Building2,
    DollarSign,
    FileText,
    Shield,
    ArrowRight,
    CheckCircle2,
    Calendar,
    Info,
    AlertCircle,
} from "lucide-react";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { escrowApi } from "@/services/api";

export const PaymentPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { details, partner, setEscrowFunded } = useTransactionStore();

    const handleFundEscrow = async () => {
        setIsLoading(true);
        try {
            // Call the backend API
            const response = await escrowApi.fundEscrow({
                amount: details.contractValue.toString(),
                currency: details.currency || "EUR",
            });
            console.log(response);
            setEscrowFunded(true);
            toast({
                title: "Escrow funded successfully",
                description:
                    "Your payment has been processed and the funds are now in escrow.",
            });

            setIsLoading(false);
            navigate("/summary");
        } catch (error) {
            console.error("Failed to fund escrow:", error);
            toast({
                title: "Failed to fund escrow",
                description:
                    "There was an error processing your payment. Please try again.",
                variant: "destructive",
            });
            setIsLoading(false);
        }
    };

    if (!details || !partner) {
        return <div>Loading...</div>;
    }

    const formattedAmount = new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: details.currency || "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(details.contractValue));

    return (
        <div className="h-screen flex flex-col">
            <HeaderSection />

            <div className="flex flex-1 overflow-hidden">
                <NavigationSidebarSection />

                <main className="flex-1 flex flex-col bg-[#f9fafb]">
                    <div className="flex-shrink-0 px-6 mt-6 mb-4">
                        <DocumentStepper />
                    </div>

                    <div className="flex-1 px-6 pb-6 overflow-auto">
                        <div className="max-w-3xl mx-auto space-y-6">
                            {/* Header */}
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Fund Escrow
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Review the transaction details and fund the
                                    escrow account to proceed with the trade.
                                </p>
                            </div>

                            {/* Transaction Summary Card */}
                            <Card className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Transaction Summary
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-[#00B0F5] rounded-lg flex items-center justify-center text-white text-xl">
                                                {partner.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {partner.name}
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-blue-50 text-blue-700 border-blue-200"
                                                    >
                                                        Exporter
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {partner.country}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="bg-gray-50 text-gray-700 border-gray-200"
                                            >
                                                TR-2024-004
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Product
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 mt-1">
                                                {details.productName}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Category:{" "}
                                                {details.productCategory}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Terms
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 mt-1">
                                                {details.incoterm}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Contract Ref:{" "}
                                                {details.contractReference}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Payment Details Card */}
                            <Card className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Payment Details
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Amount to Fund
                                            </p>
                                            <p className="text-2xl font-semibold text-gray-900 mt-1">
                                                {formattedAmount}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-emerald-600">
                                            <Shield className="w-5 h-5" />
                                            <span className="text-sm font-medium">
                                                Secured by KAYP Escrow
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                Deadline to fund: March 20, 2025
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            <span>
                                                Transaction ID: TR-2024-004
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Funds are held securely in
                                                    escrow
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Your payment is protected
                                                    until all documents are
                                                    verified and goods are
                                                    confirmed shipped.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Automatic release conditions
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Funds are automatically
                                                    released to the exporter
                                                    once shipping documents are
                                                    verified.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() =>
                                            setShowConfirmation(true)
                                        }
                                        className="w-full bg-[#00B0F5]"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 animate-spin" />
                                                Processing Payment...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4" />
                                                Fund Escrow
                                            </span>
                                        )}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <Info className="w-4 h-4" />
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="underline cursor-help">
                                                    Learn more about how escrow
                                                    works
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs">
                                                    <p>
                                                        Escrow is a financial
                                                        arrangement where a
                                                        third party holds and
                                                        regulates payment of
                                                        funds for two parties
                                                        who are in the process
                                                        of completing a
                                                        transaction.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <WorkflowNavigation isValid={true} />
                </main>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Escrow Funding</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to fund the escrow for this
                            transaction? Funds will be held securely until
                            shipment is confirmed.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                        <div className="text-sm text-amber-700">
                            <p className="font-medium">
                                Please confirm your action
                            </p>
                            <p className="mt-1">
                                You are about to transfer {formattedAmount} to
                                the escrow account. This action cannot be
                                undone.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setShowConfirmation(false);
                                handleFundEscrow();
                            }}
                            className="bg-[#00B0F5]"
                        >
                            Confirm Payment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
