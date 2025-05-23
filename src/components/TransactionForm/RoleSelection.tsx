import { Home, Users, UserCheck, User, Building, DollarSign, FileText, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { AgentRole } from '@/types/transaction';
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RoleSelectionProps {
  selectedRole?: string;
  onRoleChange: (role: any) => void;
  agentName?: string;
  onAgentNameChange?: (name: string) => void;
}

const roles = [
  {
    id: "LISTING AGENT",
    title: "Listing Agent",
    description: "Representing the seller in this transaction",
    icon: Home,
    features: [
      "Submit listing information",
      "Manage seller details",
      "Track commission splits",
      "Provide property access details"
    ]
  },
  {
    id: "BUYERS AGENT",
    title: "Buyer's Agent",
    description: "Representing the buyer in this transaction",
    icon: Users,
    features: [
      "Submit purchase information",
      "Manage buyer details",
      "Submit offer details",
      "Track buyer obligations"
    ]
  },
  {
    id: "DUAL AGENT",
    title: "Dual Agent",
    description: "Representing both parties in this transaction",
    icon: UserCheck,
    features: [
      "Manage both buyer and seller",
      "Track all transaction details",
      "Handle both sides of commission",
      "Submit comprehensive documentation"
    ]
  }
];

// Inline styles for consistent appearance
const styles = {
  container: {
    width: '100%'
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem'
  },
  iconContainer: {
    backgroundColor: '#3b82f6',
    borderRadius: '9999px',
    padding: '0.5rem',
    marginRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  icon: {
    color: 'white',
    width: '1.25rem',
    height: '1.25rem'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1e3a8a',
    marginBottom: '0.25rem'
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#3b82f6 !important',
    fontWeight: 500
  },
  inputContainer: {
    position: 'relative',
    marginTop: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    backgroundColor: 'white',
    color: '#1e3a8a'
  },
  roleCard: {
    borderRadius: '0.5rem',
    padding: '1.25rem',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden'
  },
  roleCardSelected: {
    border: '2px solid #3b82f6',
    backgroundColor: '#eff6ff',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  roleIconContainer: {
    backgroundColor: '#3b82f6',
    borderRadius: '9999px',
    padding: '0.5rem',
    marginRight: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roleTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#1e3a8a'
  },
  roleDescription: {
    fontSize: '0.875rem',
    color: '#3b82f6',
    marginTop: '0.5rem',
    fontWeight: 500
  },
  featuresList: {
    marginTop: '1rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid rgba(59, 130, 246, 0.2)',
    backgroundColor: 'transparent'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: '#1e3a8a !important',
    marginBottom: '0.25rem'
  },
  featureBullet: {
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '9999px',
    backgroundColor: '#3b82f6',
    marginRight: '0.5rem'
  },
  selectedRoleSection: {
    backgroundColor: '#eff6ff',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    border: '1px solid rgba(59, 130, 246, 0.3)'
  },
  infoTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1e3a8a',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  infoText: {
    fontSize: '0.875rem',
    color: '#3b82f6',
    marginBottom: '0.75rem',
    fontWeight: 500
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem'
  },
  infoCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: '0.375rem',
    padding: '0.75rem',
    border: '1px solid rgba(59, 130, 246, 0.3)'
  },
  infoCardTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#1e3a8a',
    marginBottom: '0.25rem'
  },
  infoCardText: {
    fontSize: '0.75rem',
    color: '#3b82f6',
    fontWeight: 500
  },
  checkIcon: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    backgroundColor: '#10b981',
    borderRadius: '9999px',
    padding: '0.25rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10
  },
  footer: {
    marginTop: '1rem',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '0.75rem',
    fontStyle: 'italic',
    color: '#3b82f6',
    fontWeight: 600
  }
};

export function RoleSelection({ selectedRole, onRoleChange, agentName, onAgentNameChange }: RoleSelectionProps) {
  const selectedRoleObj = roles.find(role => role.id === selectedRole);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={styles.container}>
      {/* Agent Name Input */}
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={styles.iconContainer}>
            <User style={styles.icon} />
          </div>
          <div>
            <h3 style={styles.title}>Welcome Agent</h3>
            <p style={styles.subtitle}>Please enter your full name</p>
          </div>
        </div>

        <div style={styles.inputContainer}>
          <Input
            id="agent-name"
            placeholder="Enter your full name"
            style={styles.input}
            value={agentName || ''}
            onChange={(e) => onAgentNameChange && onAgentNameChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>

      {/* Role Selection Cards */}
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={styles.iconContainer}>
            <Building style={styles.icon} />
          </div>
          <div>
            <h3 style={styles.title}>Select Your Role</h3>
            <p style={styles.subtitle}>Choose the role that best describes your position in this transaction</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {roles.map(role => (
            <div
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              style={{
                ...styles.roleCard,
                ...(selectedRole === role.id ? styles.roleCardSelected : {})
              }}
            >
              {selectedRole === role.id && (
                <div style={styles.checkIcon}>
                  <Check style={{ width: '1rem', height: '1rem', color: 'white' }} />
                </div>
              )}

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={styles.roleIconContainer}>
                    <role.icon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                  </div>
                  <h4 style={styles.roleTitle}>{role.title}</h4>
                </div>

                <p style={styles.roleDescription}>{role.description}</p>

                <div style={styles.featuresList}>
                  <ul>
                    {role.features.map((feature, idx) => (
                      <li key={idx} style={styles.featureItem}>
                        <div style={styles.featureBullet}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Role Details */}
      {selectedRole && (
        <div style={styles.selectedRoleSection}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={styles.iconContainer}>
              <FileText style={styles.icon} />
            </div>
            <div>
              <h3 style={styles.title}>Role Selected: {selectedRoleObj?.title}</h3>
              <p style={styles.subtitle}>{selectedRoleObj?.description}</p>
            </div>
          </div>

          <div style={styles.infoBox}>
            <h4 style={styles.infoTitle}>
              <DollarSign style={{ width: '1rem', height: '1rem', color: '#3b82f6', marginRight: '0.5rem' }} />
              What to expect next
            </h4>
            <p style={styles.infoText}>
              As a {selectedRoleObj?.title.toLowerCase()}, you'll need to provide the following information to complete this transaction:
            </p>
            <div style={styles.gridContainer}>
              <div style={styles.infoCard}>
                <h5 style={styles.infoCardTitle}>Property Details</h5>
                <p style={styles.infoCardText}>Property address, MLS number, sale price, and status</p>
              </div>
              <div style={styles.infoCard}>
                <h5 style={styles.infoCardTitle}>Client Information</h5>
                <p style={styles.infoCardText}>Client contact details and relationship information</p>
              </div>
              <div style={styles.infoCard}>
                <h5 style={styles.infoCardTitle}>Commission</h5>
                <p style={styles.infoCardText}>Commission percentages, fees, and payment details</p>
              </div>
              <div style={styles.infoCard}>
                <h5 style={styles.infoCardTitle}>Documentation</h5>
                <p style={styles.infoCardText}>Required documents and additional information</p>
              </div>
            </div>
            <div style={styles.footer}>
              <p style={styles.footerText}>Click the "Next Step" button below to continue</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
