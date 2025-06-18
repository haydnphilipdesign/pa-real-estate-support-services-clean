import React, { useEffect } from 'react';
import { Button } from "@/components/ui";
import { Users, UserPlus, Trash, User, UserCheck, Contact, Building2 } from "lucide-react";
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
    <div className="form-section">
      {/* Enhanced Section Header */}
      <div className="form-section-header">
        <div className="form-section-icon">
          <Contact className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="form-section-title">Client Information</h3>
          <p className="form-section-description">
            Manage {getClientTypeLabel().toLowerCase()} details for this transaction
          </p>
        </div>
        {clients.length > 0 && (
          <div className="ml-auto flex items-center gap-2 text-sm text-neutral-500">
            <Users className="w-4 h-4" />
            <span>{clients.length} {getClientTypeLabel().toLowerCase()}{clients.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {clients.length === 0 ? (
          <div className="form-empty-state">
            <div className="form-empty-state-icon">
              <Icon className="w-12 h-12" />
            </div>
            <div className="form-empty-state-content">
              <h3 className="form-empty-state-title">No {getClientTypeLabel()}s Added Yet</h3>
              <p className="form-empty-state-description">
                Add information about the {getClientTypeLabel().toLowerCase()}(s) for this transaction to get started.
              </p>
              <button
                onClick={handleAddClient}
                className="form-empty-state-button"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add First {getClientTypeLabel()}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {clients.map((client, index) => (
              <div
                key={client.id}
                className="form-client-card"
              >
                {/* Enhanced Client Header */}
                <div className="form-client-header">
                  <div className="flex items-center gap-3">
                    <div className="form-client-header-icon">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="form-client-header-content">
                      <h4 className="form-client-header-title">
                        {getClientTypeLabel()} {clients.length > 1 ? `#${index + 1}` : ''}
                      </h4>
                      <p className="form-client-header-subtitle">
                        {client.name || 'Unnamed client'} • {client.email || 'No email'}
                      </p>
                    </div>
                  </div>

                  {clients.length > 1 && (
                    <button
                      onClick={() => handleRemoveClient(client.id)}
                      className="form-client-remove-button"
                      title="Remove this client"
                    >
                      <Trash className="w-4 h-4" />
                      <span className="sr-only">Remove client</span>
                    </button>
                  )}
                </div>

                {/* Enhanced Client Form Fields */}
                <div className="form-client-content">
                  <ClientFormFields
                    client={client}
                    onClientChange={(field, value) => handleClientChange(client.id, field, value)}
                    role={role as AgentRole}
                  />
                </div>
              </div>
            ))}

            {/* Enhanced Add Another Button */}
            <div className="form-add-client-section">
              <button
                type="button"
                onClick={handleAddClient}
                className="form-add-client-button"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add Another {getClientTypeLabel()}
                <span className="form-add-client-hint">
                  Perfect for joint purchases or multiple parties
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};