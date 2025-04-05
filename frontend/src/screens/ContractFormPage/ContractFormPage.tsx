import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import { DocumentStepper } from "../NewBl/sections/DocumentStepper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Upload,
  ArrowRight,
  HelpCircle,
  Info,
  Ship,
  ShoppingCart,
  Wallet,
  Clock,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WorkflowNavigation } from "@/components/WorkflowNavigation";
import { Badge } from "@/components/ui/badge";

import { contacts } from '@/mock/contacts';
import {
  productCategories,
  incoterms,
  transportModes,
  currencies,
  countries,
  invoicingModes,
  mockExtractedData
} from '@/mock/contractData';
import { useTransactionStore, FundingMethod, RepaymentTerm } from '@/stores/useTransactionStore';

const repaymentOptions = [
  { term: '30d' as RepaymentTerm, label: '30 days', fee: 5 },
  { term: '60d' as RepaymentTerm, label: '60 days', fee: 6.5 },
  { term: '90d' as RepaymentTerm, label: '90 days', fee: 8 },
];

export const ContractFormPage = () => {
  const navigate = useNavigate();
  const {
    userRole,
    setUserRole,
    setPartner,
    updateDetails,
    details
  } = useTransactionStore();

  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState(details);

  useEffect(() => {
    if (userRole && selectedContact) {
      const originCountry = userRole === 'Importer' ? selectedContact.country : 'US';
      handleInputChange('countryOfOrigin', originCountry);
    }
  }, [userRole, selectedContact]);

  useEffect(() => {
    if (formData.quantity && formData.unitPrice) {
      const calculatedValue = Number(formData.quantity) * Number(formData.unitPrice);
      handleInputChange('contractValue', calculatedValue.toString());
    }
  }, [formData.quantity, formData.unitPrice]);

  useEffect(() => {
    if (formData.currency && !formData.paymentCurrency) {
      handleInputChange('paymentCurrency', formData.currency);
    }
  }, [formData.currency]);

  const handleContactSelect = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    setSelectedContact(contact);
    setPartner(contact);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    updateDetails({ [field]: value });

    // Update fee when funding method or repayment term changes
    if (field === 'fundingMethod') {
      const newFee = value === 'self' ? 2 : (
        formData.repaymentTerm 
          ? repaymentOptions.find(opt => opt.term === formData.repaymentTerm)?.fee 
          : 5
      );
      updateDetails({ calculatedFee: newFee });
    }
    
    if (field === 'repaymentTerm') {
      const newFee = repaymentOptions.find(opt => opt.term === value)?.fee;
      updateDetails({ calculatedFee: newFee });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      handleInputChange('uploadedContract', file);
    }
  };

  const handleAIExtract = (enabled) => {
    if (enabled && formData.uploadedContract) {
      setFormData(prev => ({
        ...prev,
        ...mockExtractedData
      }));
    }
  };

  const getIncoTermDescription = (term) => {
    const selectedIncoterm = incoterms.find(i => i.value === term);
    return selectedIncoterm?.description || '';
  };

  const isFormValid = () => {
    return userRole &&
           selectedContact &&
           formData.productName &&
           formData.productCategory &&
           formData.productDescription &&
           formData.quantity &&
           formData.unitPrice &&
           formData.contractValue &&
           formData.incoterm &&
           formData.tradeType &&
           formData.invoicingMode &&
           formData.transportMode &&
           formData.departureLocation &&
           formData.arrivalLocation &&
           formData.plannedDepartureDate &&
           formData.expectedArrivalDate;
  };

  const handleContinue = () => {
    navigate('/notification');
  };

  const RoleCard = ({ role, icon, description, onClick, isSelected }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-[#00B0F5] bg-blue-50' 
          : 'hover:bg-gray-50'
      }`}
    >
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#00B0F5] bg-opacity-10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{role}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const FundingOptionCard = ({ method, icon, title, description, fee, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-[#00B0F5] bg-blue-50' 
          : 'hover:bg-gray-50'
      }`}
    >
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#00B0F5] bg-opacity-10 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {fee}% fee
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </Card>
    </div>
  );

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
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Contract</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Define the key elements of your commercial agreement to initiate a secure international transaction.
                </p>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  What is your role in this transaction?
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <RoleCard
                    role="Importer"
                    icon={<ShoppingCart className="w-6 h-6 text-[#00B0F5]" />}
                    description="You are purchasing goods from a foreign supplier"
                    onClick={() => setUserRole('Importer')}
                    isSelected={userRole === 'Importer'}
                  />
                  <RoleCard
                    role="Exporter"
                    icon={<Ship className="w-6 h-6 text-[#00B0F5]" />}
                    description="You are shipping goods to a foreign buyer"
                    onClick={() => setUserRole('Exporter')}
                    isSelected={userRole === 'Exporter'}
                  />
                </div>
              </div>

              {userRole && (
                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column - 2/3 width */}
                  <div className="col-span-2 space-y-6">
                    {/* Business Partner Selection */}
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Select your business partner
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <Label>Business Partner</Label>
                          <Select onValueChange={handleContactSelect}>
                            <SelectTrigger>
                              <SelectValue placeholder="Search contacts..." />
                            </SelectTrigger>
                            <SelectContent>
                              {contacts.map(contact => (
                                <SelectItem key={contact.id} value={contact.id}>
                                  <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    <span>{contact.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedContact && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">{selectedContact.name}</span>
                              <Badge 
                                variant="outline" 
                                className={
                                  userRole === 'Importer'
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-purple-50 text-purple-700 border-purple-200"
                                }
                              >
                                {userRole === 'Importer' ? 'Exporter' : 'Importer'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{selectedContact.country}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{selectedContact.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{selectedContact.phone}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Funding Options (Only for Importers) */}
                    {userRole === 'Importer' && (
                      <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                          How do you want to fund this transaction?
                        </h2>
                        
                        <div className="space-y-4">
                          <FundingOptionCard
                            method="self"
                            icon={<Wallet className="w-6 h-6 text-[#00B0F5]" />}
                            title="I will fund the escrow myself"
                            description="Secure your transaction with a 2% escrow fee"
                            fee={2}
                            isSelected={formData.fundingMethod === 'self'}
                            onClick={() => handleInputChange('fundingMethod', 'self')}
                          />

                          <FundingOptionCard
                            method="financed"
                            icon={<CreditCard className="w-6 h-6 text-[#00B0F5]" />}
                            title="Use a financing provider"
                            description="Get immediate financing with flexible repayment terms"
                            fee={formData.repaymentTerm ? repaymentOptions.find(opt => opt.term === formData.repaymentTerm)?.fee : 5}
                            isSelected={formData.fundingMethod === 'financed'}
                            onClick={() => handleInputChange('fundingMethod', 'financed')}
                          />

                          {formData.fundingMethod === 'financed' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <Label className="mb-2 block">Select repayment term</Label>
                              <div className="grid grid-cols-3 gap-4">
                                {repaymentOptions.map((option) => (
                                  <Card
                                    key={option.term}
                                    className={`p-4 cursor-pointer transition-all ${
                                      formData.repaymentTerm === option.term
                                        ? 'ring-2 ring-[#00B0F5] bg-blue-50'
                                        : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleInputChange('repaymentTerm', option.term)}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <Clock className="w-4 h-4 text-gray-400" />
                                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                        {option.fee}%
                                      </Badge>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                      Repay in {option.label}
                                    </p>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    )}

                    {/* Product Information */}
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Product Information
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Product Name</Label>
                            <Input
                              value={formData.productName}
                              onChange={(e) => handleInputChange('productName', e.target.value)}
                              placeholder="Enter product name"
                            />
                          </div>

                          <div>
                            <Label>Product Category</Label>
                            <Select
                              value={formData.productCategory}
                              onValueChange={(value) => handleInputChange('productCategory', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {productCategories.map(category => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Product Description</Label>
                          <Textarea
                            value={formData.productDescription}
                            onChange={(e) => handleInputChange('productDescription', e.target.value)}
                            placeholder="Describe the products in detail"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              value={formData.quantity}
                              onChange={(e) => handleInputChange('quantity', e.target.value)}
                              placeholder="Enter quantity"
                            />
                          </div>

                          <div>
                            <Label>Unit Price</Label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={formData.unitPrice}
                                onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                                placeholder="Enter unit price"
                                className="flex-1"
                              />
                              <Select
                                value={formData.currency}
                                onValueChange={(value) => handleInputChange('currency', value)}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  {currencies.map(currency => (
                                    <SelectItem key={currency.value} value={currency.value}>
                                      {currency.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>HS Code (optional)</Label>
                            <Input
                              value={formData.hsCode}
                              onChange={(e) => handleInputChange('hsCode', e.target.value)}
                              placeholder="Enter HS code"
                            />
                          </div>

                          <div>
                            <Label>Country of Origin</Label>
                            <Select
                              value={formData.countryOfOrigin}
                              onValueChange={(value) => handleInputChange('countryOfOrigin', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.map(country => (
                                  <SelectItem key={country.value} value={country.value}>
                                    {country.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Commercial Terms */}
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Commercial Terms
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Contract Value (auto-calculated)</Label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={formData.contractValue}
                                readOnly
                                className="flex-1 bg-gray-50"
                              />
                              <div className="w-24 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200 text-gray-500">
                                {formData.currency}
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label>Currency for Payment (optional)</Label>
                            <Select
                              value={formData.paymentCurrency}
                              onValueChange={(value) => handleInputChange('paymentCurrency', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {currencies.map(currency => (
                                  <SelectItem key={currency.value} value={currency.value}>
                                    {currency.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <Label>Incoterm</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-4 h-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">{getIncoTermDescription(formData.incoterm)}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Select
                            value={formData.incoterm}
                            onValueChange={(value) => handleInputChange('incoterm', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Incoterm" />
                            </SelectTrigger>
                            <SelectContent>
                              {incoterms.map(incoterm => (
                                <SelectItem key={incoterm.value} value={incoterm.value}>
                                  {incoterm.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Reference Contract Number</Label>
                            <Input
                              value={formData.contractReference}
                              onChange={(e) => handleInputChange('contractReference', e.target.value)}
                              placeholder="Enter reference number"
                            />
                          </div>

                          <div>
                            <Label>Trade Type</Label>
                            <RadioGroup
                              className="flex gap-4 mt-2"
                              value={formData.tradeType}
                              onValueChange={(value) => handleInputChange('tradeType', value)}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="one-off" id="one-off" />
                                <Label htmlFor="one-off">One-Off</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="recurring" id="recurring" />
                                <Label htmlFor="recurring">Recurring</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>

                        <div>
                          <Label>Mode of Invoicing</Label>
                          <RadioGroup
                            className="flex gap-4 mt-2"
                            value={formData.invoicingMode}
                            onValueChange={(value) => handleInputChange('invoicingMode', value)}
                          >
                            {invoicingModes.map(mode => (
                              <div key={mode.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={mode.value} id={mode.value} />
                                <Label htmlFor={mode.value}>{mode.label}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <Label>Payment Terms</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="w-4 h-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">Funds will be locked at start of transaction and released upon verified document submission.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="mt-2 bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                            Escrow via KAYP
                          </div>
                        </div>

                        <div>
                          <Label>Custom Clauses or Additional Requirements (optional)</Label>
                          <Textarea
                            value={formData.customClauses}
                            onChange={(e) => handleInputChange('customClauses', e.target.value)}
                            placeholder="Enter any special terms, conditions, or requirements"
                            className="h-24"
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Logistics */}
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Logistics
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <Label>Mode of Transport</Label>
                          <Select
                            value={formData.transportMode}
                            onValueChange={(value) => handleInputChange('transportMode', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select transport mode" />
                            </SelectTrigger>
                            <SelectContent>
                              {transportModes.map(mode => (
                                <SelectItem key={mode.value} value={mode.value}>
                                  {mode.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {formData.incoterm && (
                          <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <p className="text-sm text-blue-700">
                              🧾 Based on {formData.incoterm}, the {userRole === 'Importer' ? 'Exporter' : 'Importer'} is responsible for delivery until arrival port.
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Departure Location</Label>
                            <Input
                              value={formData.departureLocation}
                              onChange={(e) => handleInputChange('departureLocation', e.target.value)}
                              placeholder="Enter departure location"
                            />
                          </div>

                          <div>
                            <Label>Arrival Location</Label>
                            <Input
                              value={formData.arrivalLocation}
                              onChange={(e) => handleInputChange('arrivalLocation', e.target.value)}
                              placeholder="Enter arrival location"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Planned Departure Date</Label>
                            <DatePicker
                              selected={formData.plannedDepartureDate}
                              onChange={(date) => handleInputChange('plannedDepartureDate', date)}
                              className="w-full rounded-md border border-gray-200 px-3 py-2"
                              placeholderText="Select departure date"
                            />
                          </div>

                          <div>
                            <Label>Expected Arrival Date</Label>
                            <DatePicker
                              selected={formData.expectedArrivalDate}
                              onChange={(date) => handleInputChange('expectedArrivalDate', date)}
                              className="w-full rounded-md border border-gray-200 px-3 py-2"
                              placeholderText="Select arrival date"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Multileg Shipment?</Label>
                          <Switch
                            checked={formData.isMultileg}
                            onCheckedChange={(checked) => handleInputChange('isMultileg', checked)}
                          />
                        </div>

                        {formData.isMultileg && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">
                              Multileg shipment breakdown will be available in a future update.
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column - 1/3 width */}
                  <div className="space-y-6">
                    {/* Insurance & Compliance */}
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Insurance & Compliance
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Product Insurance</Label>
                          <Switch
                            checked={formData.isInsured}
                            onCheckedChange={(checked) => handleInputChange('isInsured', checked)}
                          />
                        </div>

                        {formData.isInsured && (
                          <>
                            <div>
                              <Label>Insurance Provider</Label>
                              <Input
                                value={formData.insuranceProvider}
                                onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                                placeholder="Enter provider name"
                              />
                            </div>

                            <div>
                              <Label>Policy Number</Label>
                              <Input
                                value={formData.policyNumber}
                                onChange={(e) => handleInputChange('policyNumber',e.target.value)}
                                placeholder="Enter policy number"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </Card>

                    {/* Contract Upload */}
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Upload Contract (Optional)
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                          <div className="flex flex-col items-center justify-center text-center">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                              Drag and drop your contract file here, or click to browse
                            </p>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="contract-upload"
                            />
                            <Button
                              variant="outline"
                              onClick={() => document.getElementById('contract-upload').click()}
                            >
                              Browse Files
                            </Button>
                          </div>
                        </div>

                        {formData.uploadedContract && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>AI-Powered Data Extraction</Label>
                              <Switch
                                checked={formData.useAIExtraction}
                                onCheckedChange={handleAIExtract}
                              />
                            </div>
                            <p className="text-sm text-gray-500">
                              Let our AI extract and populate contract details automatically
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Navigation */}
                    <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
                      <Button
                        className="w-full"
                        onClick={handleContinue}
                        disabled={!isFormValid()}
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};