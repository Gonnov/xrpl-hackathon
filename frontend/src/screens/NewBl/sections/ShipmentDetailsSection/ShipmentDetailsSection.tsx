import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const ShipmentDetailsSection = (): JSX.Element => {
  // Data for add buttons
  const addButtonsData = [
    { id: 1, label: "Add a notify party" },
    { id: 2, label: "Add a freight forwarder" },
  ];

  // Data for From section fields
  const fromFields = [
    { id: 1, label: "Port of loading" },
    { id: 2, label: "Date" },
    { id: 3, label: "Place of receipt" },
  ];

  // Data for To section fields
  const toFields = [
    { id: 1, label: "Port of discharge" },
    { id: 2, label: "Date" },
    { id: 3, label: "Place of delivery" },
  ];

  // Data for Goods section fields
  const goodsFields = [
    {
      id: 1,
      label: "Marks and number",
      optional: false,
      unit: null,
      halfWidth: true,
    },
    {
      id: 2,
      label: "Container number and seal",
      optional: true,
      unit: null,
      halfWidth: true,
    },
    { id: 3, label: "Weight", optional: false, unit: "Kg", halfWidth: true },
    { id: 4, label: "Tare", optional: false, unit: "Kg", halfWidth: true },
    {
      id: 5,
      label: "Measurement",
      optional: false,
      unit: "m3",
      halfWidth: true,
    },
    {
      id: 6,
      label: "Description of package and goods",
      optional: false,
      unit: null,
      halfWidth: false,
    },
    {
      id: 7,
      label: "Type of package",
      optional: false,
      unit: null,
      halfWidth: true,
    },
    {
      id: 8,
      label: "Quantity",
      optional: false,
      unit: null,
      halfWidth: true,
      width: "168px",
    },
  ];

  // Data for Goods add buttons
  const goodsAddButtons = [
    { id: 1, label: "Dangerous Goods Information" },
    { id: 2, label: "Special handling unstructions" },
  ];

  // Data for Financial section fields
  const financialFields = [
    { id: 1, label: "Total goods value", optional: false, unit: "€" },
    {
      id: 2,
      label: "Freight Payment Terms",
      optional: false,
      unit: null,
      hasDropdown: true,
    },
    { id: 3, label: "Freight amount", optional: false, unit: "€" },
    {
      id: 4,
      label: "Insurance",
      optional: true,
      unit: null,
      hasDropdown: true,
    },
  ];

  // Data for Specific instruction section
  const specificInstructionField = { label: "Type of B/L", hasDropdown: true };

  // Data for Specific instruction add buttons
  const specificInstructionAddButtons = [
    { id: 1, label: "Add a special clause" },
    { id: 2, label: "Add a permit or certification to transport goods" },
    { id: 3, label: "Specific customs information" },
    { id: 4, label: "License number" },
    { id: 5, label: "Attach document" },
  ];

  return (
    <div className="flex flex-col w-full items-start gap-3">
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h3 className="font-title-block font-[number:var(--title-block-font-weight)] text-neutraltextbold text-[length:var(--title-block-font-size)] tracking-[var(--title-block-letter-spacing)] leading-[var(--title-block-line-height)]">
                Consignee
              </h3>

              <div className="flex flex-col items-start gap-1 w-full rounded-lg">
                <div className="flex flex-col items-start gap-1 w-full">
                  <Select>
                    <SelectTrigger className="h-8 w-full bg-app-background rounded-lg border border-[#eff0f2]">
                      <SelectValue
                        placeholder="Find or add a consignee"
                        className="text-neutraltextsoft text-[13px]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Dropdown content would go here */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {addButtonsData.map((button) => (
              <Button
                key={button.id}
                variant="ghost"
                className="h-8 px-2 py-0 justify-start"
              >
                <PlusIcon className="w-3.5 h-3.5 mr-2" />
                <span className="font-button font-[number:var(--button-font-weight)] text-neutraltextsoft text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)]">
                  {button.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="font-title-block font-[number:var(--title-block-font-weight)] text-neutraltextbold text-[length:var(--title-block-font-size)] tracking-[var(--title-block-letter-spacing)] leading-[var(--title-block-line-height)]">
              From
            </h3>

            <div className="flex flex-col items-start justify-center gap-2 w-full">
              {fromFields.map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col items-start gap-1 w-full rounded-lg"
                >
                  <div className="inline-flex items-center justify-center gap-1">
                    <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                      {field.label}
                    </label>
                  </div>

                  <Select>
                    <SelectTrigger className="h-8 w-full bg-app-background rounded-lg border border-[#eff0f2]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Dropdown content would go here */}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="font-title-block font-[number:var(--title-block-font-weight)] text-neutraltextbold text-[length:var(--title-block-font-size)] tracking-[var(--title-block-letter-spacing)] leading-[var(--title-block-line-height)]">
              To
            </h3>

            <div className="flex flex-col items-start justify-center gap-2 w-full">
              {toFields.map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col items-start gap-1 w-full rounded-lg"
                >
                  <div className="inline-flex items-center justify-center gap-1">
                    <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                      {field.label}
                    </label>
                  </div>

                  <Select>
                    <SelectTrigger className="h-8 w-full bg-app-background rounded-lg border border-[#eff0f2]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Dropdown content would go here */}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="font-title-block font-[number:var(--title-block-font-weight)] text-neutraltextbold text-[length:var(--title-block-font-size)] tracking-[var(--title-block-letter-spacing)] leading-[var(--title-block-line-height)]">
              Goods
            </h3>

            <div className="flex flex-col items-start justify-center gap-2 w-full">
              <div className="flex items-start gap-2 w-full">
                <div className="flex flex-col h-14 items-start gap-1 flex-1 rounded-lg">
                  <div className="inline-flex items-center justify-center gap-1">
                    <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                      Marks and number
                    </label>
                  </div>
                  <Input className="h-8 bg-app-background rounded-lg border border-[#eff0f2]" />
                </div>

                <div className="flex-1 flex flex-col items-start gap-1 rounded-lg">
                  <div className="inline-flex items-center justify-center gap-1 mr-[-5.00px]">
                    <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                      Container number and seal
                    </label>
                    <span className="font-normal text-neutral-500 text-xs leading-4 whitespace-nowrap">
                      (optional)
                    </span>
                  </div>
                  <Input className="h-8 bg-app-background rounded-lg border border-[#eff0f2]" />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full">
                {["Weight", "Tare", "Measurement"].map((label, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-start gap-1 rounded-lg"
                  >
                    <div className="inline-flex items-center justify-center gap-1">
                      <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                        {label}
                      </label>
                    </div>
                    <div className="flex h-8 items-start w-full bg-app-background rounded-lg overflow-hidden border border-solid border-[#eff0f2]">
                      <Input className="h-8 border-0 flex-1" />
                      <div className="inline-flex items-center justify-center gap-2 p-2 self-stretch border-l border-[#eff0f2]">
                        <span className="mt-[-3.00px] mb-[-1.00px] font-normal text-neutraltextsoft text-[13px] leading-5 whitespace-nowrap">
                          {label === "Measurement" ? "m3" : "Kg"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-14 w-full flex flex-col items-start gap-1 rounded-lg">
                <div className="inline-flex items-center justify-center gap-1">
                  <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                    Description of package and goods
                  </label>
                </div>
                <Input className="h-8 bg-app-background rounded-lg border border-[#eff0f2]" />
              </div>

              <div className="flex items-center gap-2 w-full">
                <div className="flex-1 flex flex-col items-start gap-1 rounded-lg">
                  <div className="inline-flex items-center justify-center gap-1">
                    <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                      Type of package
                    </label>
                  </div>
                  <Select>
                    <SelectTrigger className="h-8 w-full bg-app-background rounded-lg border border-[#eff0f2]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Dropdown content would go here */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-[168px] flex flex-col items-start gap-1 rounded-lg">
                  <div className="inline-flex items-center justify-center gap-1">
                    <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                      Quantity
                    </label>
                  </div>
                  <Input className="h-8 bg-app-background rounded-lg border border-[#eff0f2]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1">
              {goodsAddButtons.map((button) => (
                <Button
                  key={button.id}
                  variant="ghost"
                  className="h-8 px-2 py-0 justify-start"
                >
                  <PlusIcon className="w-3.5 h-3.5 mr-2" />
                  <span className="font-button font-[number:var(--button-font-weight)] text-neutraltextsoft text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)]">
                    {button.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="font-title-block font-[number:var(--title-block-font-weight)] text-neutraltextbold text-[length:var(--title-block-font-size)] tracking-[var(--title-block-letter-spacing)] leading-[var(--title-block-line-height)]">
              Financial informations
            </h3>
          </div>

          <div className="flex flex-col items-start justify-center gap-2 w-full">
            {financialFields.map((field, index) => (
              <div
                key={index}
                className={`${field.label === "Freight Payment Terms" || field.label === "Insurance" ? "h-14" : ""} w-full flex flex-col items-start gap-1 rounded-lg`}
              >
                <div className="inline-flex items-center justify-center gap-1">
                  <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                    {field.label}
                  </label>
                  {field.optional && (
                    <span className="font-normal text-neutraltextsoft text-xs leading-4 whitespace-nowrap">
                      (optional)
                    </span>
                  )}
                </div>

                {field.hasDropdown ? (
                  <Select>
                    <SelectTrigger className="h-8 w-full bg-app-background rounded-lg border border-[#eff0f2]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Dropdown content would go here */}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex h-8 items-start w-full bg-app-background rounded-lg overflow-hidden border border-solid border-[#eff0f2]">
                    <Input className="h-8 border-0 flex-1" />
                    {field.unit && (
                      <div className="inline-flex items-center justify-center gap-2 p-2 self-stretch border-l border-[#eff0f2]">
                        <span className="mt-[-3.00px] mb-[-1.00px] font-normal text-neutraltextsoft text-[13px] leading-5 whitespace-nowrap">
                          {field.unit}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="font-title-block font-[number:var(--title-block-font-weight)] text-neutraltextbold text-[length:var(--title-block-font-size)] tracking-[var(--title-block-letter-spacing)] leading-[var(--title-block-line-height)]">
              Specific instruction
            </h3>
          </div>

          <div className="flex flex-col items-start justify-center gap-2 w-full">
            <div className="h-14 w-full flex flex-col items-start gap-1 rounded-lg">
              <div className="inline-flex items-center justify-center gap-1">
                <label className="mt-[-1.00px] font-normal text-neutraltextbold text-[13px] leading-5 whitespace-nowrap">
                  {specificInstructionField.label}
                </label>
              </div>
              <Select>
                <SelectTrigger className="h-8 w-full bg-app-background rounded-lg border border-[#eff0f2]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {/* Dropdown content would go here */}
                </SelectContent>
              </Select>
            </div>

            {specificInstructionAddButtons.map((button) => (
              <Button
                key={button.id}
                variant="ghost"
                className="h-8 px-2 py-0 justify-start"
              >
                <PlusIcon className="w-3.5 h-3.5 mr-2" />
                <span className="font-button font-[number:var(--button-font-weight)] text-neutraltextsoft text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)]">
                  {button.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="inline-flex items-center gap-1">
        <Button
          variant="outline"
          className="h-8 px-2 py-0 bg-app-background rounded-lg border border-[#eff0f2] shadow-shadow-s"
        >
          <span className="font-button font-[number:var(--button-font-weight)] text-neutraltextbold text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)]">
            Cancel
          </span>
        </Button>

        <Button className="h-8 px-2 py-0 bg-accentbackgroundbold rounded-lg">
          <span className="font-button font-[number:var(--button-font-weight)] text-neutraltextbold-inverse-stay text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)]">
            Create
          </span>
        </Button>
      </div>
    </div>
  );
};
