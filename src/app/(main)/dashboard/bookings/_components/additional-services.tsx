"use client";

import { useState } from "react";

import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface AdditionalServicesProps {
  services?: AdditionalService[];
  onServicesChange?: (services: AdditionalService[]) => void;
  readonly?: boolean;
}

export function AdditionalServices({ services = [], onServicesChange, readonly = false }: AdditionalServicesProps) {
  const [newService, setNewService] = useState({ name: "", price: 0, description: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddService = () => {
    if (newService.name && newService.price > 0) {
      const service: AdditionalService = {
        id: Date.now().toString(),
        name: newService.name,
        price: newService.price,
        description: newService.description || undefined,
      };

      onServicesChange?.([...services, service]);
      setNewService({ name: "", price: 0, description: "" });
      setIsAdding(false);
    }
  };

  const handleRemoveService = (id: string) => {
    onServicesChange?.(services.filter((service) => service.id !== id));
  };

  const totalPrice = services.reduce((sum, service) => sum + service.price, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Additional Services</CardTitle>
          {!readonly && (
            <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.length === 0 && !isAdding && (
          <p className="py-4 text-center text-sm text-gray-500">No additional services added</p>
        )}

        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <div key={service.id} className="flex min-w-fit items-center gap-2 rounded-lg border bg-gray-50 p-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{service.name}</span>
                <Badge variant="secondary">₹{service.price.toFixed(0)}</Badge>
              </div>
              {!readonly && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveService(service.id)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {isAdding && (
          <div className="space-y-3 rounded-lg border bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <Label htmlFor="service-price">Price ($)</Label>
                <Input
                  id="service-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newService.price || ""}
                  onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="service-description">Description (Optional)</Label>
              <Input
                id="service-description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Brief description of the service"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddService} size="sm">
                Add Service
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewService({ name: "", price: 0, description: "" });
                }}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {services.length > 0 && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Additional Services:</span>
              <span className="text-lg font-semibold text-green-600">₹{totalPrice.toFixed(0)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
