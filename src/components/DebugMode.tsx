import React from 'react';
import DiagnosticsHelper from './DiagnosticsHelper';

/**
 * Component that can be added to any page to enable debugging tools
 * Add this component to pages where you need to diagnose styling issues
 */
const DebugMode: React.FC = () => {
  return (
    <>
      <DiagnosticsHelper />

      {/* Style inspector that shows element z-index and stacking context */}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          zIndex: 9999,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          pointerEvents: 'none'
        }}
      >
        Debug Mode Active
      </div>
    </>
  );
};

export default DebugMode;