import React, { useEffect } from 'react';
import { Button } from "@/components/ui";
import { Users, UserPlus, Trash, User, UserCheck } from "lucide-react";
import { ClientFormFields } from './client/ClientFormFields';
import type { Client, AgentRole } from '@/types/transaction';
import { v4 as uuidv4 } from 'uuid';

interface ClientInformationProps {
  clients: Client[];
  onChange: (clients: Client[]) => void;
  agentRole?: AgentRole;
  onAddClient?: () => void;
  onRemoveClient?: (id: string) => void;
  onClientChange?: (id: string, field: string, value: any) => void;
  role?: string;
}

export const ClientInformation: React.FC<ClientInformationProps> = ({
  clients = [],
  role,
  onClientChange,
  onAddClient,
  onRemoveClient,
  onChange
}) => {
  // Define default handlers
  const handleRemoveClient = (id: string) => {
    if (onRemoveClient) {
      onRemoveClient(id);
    } else {
      // Default implementation
      onChange(clients.filter(client => client.id !== id));
    }
  };

  const handleClientChange = (id: string, field: string, value: any) => {
    if (onClientChange) {
      onClientChange(id, field, value);
    } else {
      // Default implementation
      onChange(clients.map(client =>
        client.id === id ? { ...client, [field]: value } : client
      ));
    }
  };

  const handleAddClient = () => {
    if (onAddClient) {
      onAddClient();
    } else {
      // Default implementation
      const clientType = role === "LISTING AGENT" ? "SELLER" : "BUYER";
      const newClient: Client = {
        id: uuidv4(),
        name: '',
        email: '',
        phone: '',
        address: '',
        maritalStatus: 'SINGLE',
        type: clientType as "BUYER" | "SELLER" // Type assertion to ensure correct type
      };
      onChange([...clients, newClient]);
    }
  };

  // Update client types when role changes or component loads
  useEffect(() => {
    if (role && clients.length > 0) {
      let needsUpdate = false;
      const updatedClients = clients.map(client => {
        // For listing agent, all clients should be sellers
        if (role === "LISTING AGENT" && client.type !== "SELLER") {
          needsUpdate = true;
          return { ...client, type: "SELLER" as const };
        }
        // For buyers agent, all clients should be buyers
        else if (role === "BUYERS AGENT" && client.type !== "BUYER") {
          needsUpdate = true;
          return { ...client, type: "BUYER" as const };
        }
        return client;
      });

      // Only update if needed to avoid infinite loops
      if (needsUpdate) {
        onChange(updatedClients);
      }
    }
  }, [role, clients, onChange]);

  // Determine client type label based on role
  const getClientTypeLabel = () => {
    if (role === "LISTING AGENT") return "Seller";
    if (role === "BUYERS AGENT") return "Buyer";
    return "Client";
  };

  const getIcon = () => {
    if (role === "LISTING AGENT") return User;
    if (role === "BUYERS AGENT") return Users;
    return UserCheck;
  };

  const Icon = getIcon();

  return (
    <div className="tf-client-info">
      <div className="tf-glass-card">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <Users className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Client Information</h3>
            <p className="tf-text-subtitle">Manage {getClientTypeLabel().toLowerCase()} details for this transaction</p>
          </div>
        </div>

        {clients.length === 0 ? (
          <div className="tf-glass-card-light tf-text-center">
            <div className="tf-icon-container tf-mx-auto tf-mb-4">
              <Icon className="tf-icon-lg" />
            </div>
            <h3 className="tf-heading-tertiary tf-mb-2">No {getClientTypeLabel()}s Added Yet</h3>
            <p className="tf-text-description tf-mb-4">Add information about the {getClientTypeLabel().toLowerCase()}(s) for this transaction.</p>
            <button
              onClick={handleAddClient}
              className="tf-button tf-button-primary"
            >
              <UserPlus className="tf-button-icon" />
              Add {getClientTypeLabel()}
            </button>
          </div>
        ) : (
          <div className="tf-client-list">
            {clients.map((client, index) => (
              <div
                key={client.id}
                className="tf-glass-card-light tf-mb-4"
              >
                {/* Client header */}
                <div className="tf-client-header">
                  <div className="tf-flex tf-items-center tf-gap-3">
                    <div className="tf-icon-container tf-icon-sm-container">
                      <Icon className="tf-icon-sm" />
                    </div>
                    <h3 className="tf-heading-tertiary">
                      {getClientTypeLabel()} {clients.length > 1 ? `#${index + 1}` : ''}
                    </h3>
                  </div>

                  {clients.length > 1 && (
                    <button
                      onClick={() => handleRemoveClient(client.id)}
                      className="tf-button tf-button-secondary tf-button-danger"
                    >
                      <Trash className="tf-button-icon" />
                      Remove
                    </button>
                  )}
                </div>

                {/* Client form fields */}
                <div className="tf-client-form-content">
                  <ClientFormFields
                    client={client}
                    onClientChange={(field, value) => handleClientChange(client.id, field, value)}
                    role={role as AgentRole}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddClient}
              className="tf-button tf-button-secondary tf-button-dashed tf-w-full"
            >
              <UserPlus className="tf-button-icon" />
              Add Another {getClientTypeLabel()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};