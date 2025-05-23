import React, { useState, useEffect } from 'react';

const HeaderDiagnostic: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState({
    headerElement: null,
    headerRect: null,
    elementsAtPoint: [],
    zIndexInfo: [],
    clickTest: false
  });

  const runDiagnostics = () => {
    // Find header element
    const header = document.querySelector('header, .main-navigation-header');
    const headerRect = header?.getBoundingClientRect();
    
    // Test click detection at header center
    const centerX = headerRect ? headerRect.left + headerRect.width / 2 : 0;
    const centerY = headerRect ? headerRect.top + headerRect.height / 2 : 0;
    
    // Get all elements at the header center point
    const elementsAtPoint = document.elementsFromPoint(centerX, centerY);
    
    // Get z-index information
    const zIndexInfo = elementsAtPoint.map((el, index) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        index,
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        zIndex: computedStyle.zIndex,
        position: computedStyle.position,
        pointerEvents: computedStyle.pointerEvents,
        opacity: computedStyle.opacity
      };
    });

    // Test if header links are clickable
    const links = document.querySelectorAll('header a, .main-navigation-header a');
    const clickTest = Array.from(links).every(link => {
      const style = window.getComputedStyle(link as Element);
      return style.pointerEvents !== 'none' && style.visibility !== 'hidden';
    });

    setDiagnostics({
      headerElement: header ? 'Found' : 'Not Found',
      headerRect: headerRect ? {
        top: Math.round(headerRect.top),
        left: Math.round(headerRect.left),
        width: Math.round(headerRect.width),
        height: Math.round(headerRect.height)
      } : null,
      elementsAtPoint: elementsAtPoint.slice(0, 10).map(el => ({
        tag: el.tagName,
        class: el.className.substring(0, 30),
        id: el.id
      })),
      zIndexInfo: zIndexInfo.slice(0, 8),
      clickTest
    });
  };

  const testHeaderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const header = document.querySelector('header');
    if (header) {
      // Simulate click on first navigation link
      const firstLink = header.querySelector('a') as HTMLElement;
      if (firstLink) {
        firstLink.style.border = '3px solid red';
        setTimeout(() => {
          firstLink.style.border = '';
        }, 2000);
        alert('Found navigation link - highlighted in red for 2 seconds');
      } else {
        alert('No navigation links found in header');
      }
    }
  };

  const forceFixHeader = () => {
    // Apply aggressive CSS fixes to header
    const style = document.createElement('style');
    style.innerHTML = `
      /* Emergency header fix */
      header, .main-navigation-header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
        background: rgba(26, 32, 44, 0.95) !important;
      }
      
      header a, .main-navigation-header a,
      header button, .main-navigation-header button {
        z-index: 10000 !important;
        pointer-events: auto !important;
        position: relative !important;
        display: inline-block !important;
        cursor: pointer !important;
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        padding: 8px 16px !important;
        margin: 4px !important;
        color: white !important;
        text-decoration: none !important;
      }
      
      header a:hover, .main-navigation-header a:hover {
        background: rgba(255, 255, 255, 0.2) !important;
      }
      
      /* Clear any overlays from header area */
      body::before, .background-slideshow::before,
      [data-is-transitioning]::before {
        clip-path: inset(100px 0 0 0) !important;
      }
    `;
    document.head.appendChild(style);
    alert('Emergency header fix applied! Try clicking navigation now.');
  };

  useEffect(() => {
    runDiagnostics();
    
    // Re-run diagnostics every 2 seconds
    const interval = setInterval(runDiagnostics, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 10000,
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto'
    }}>
      <h3 style={{ color: '#00ff00', margin: '0 0 12px 0' }}>Header Navigation Diagnostics</h3>
      
      <div style={{ marginBottom: '12px' }}>
        <strong>Header Element:</strong> {diagnostics.headerElement}
      </div>
      
      {diagnostics.headerRect && (
        <div style={{ marginBottom: '12px' }}>
          <strong>Header Position:</strong><br/>
          Top: {diagnostics.headerRect.top}px, Left: {diagnostics.headerRect.left}px<br/>
          Size: {diagnostics.headerRect.width}×{diagnostics.headerRect.height}px
        </div>
      )}
      
      <div style={{ marginBottom: '12px' }}>
        <strong>Click Test:</strong> <span style={{ color: diagnostics.clickTest ? '#00ff00' : '#ff0000' }}>
          {diagnostics.clickTest ? 'PASS' : 'FAIL'}
        </span>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <strong>Elements at Header Center:</strong>
        {diagnostics.elementsAtPoint.map((el, i) => (
          <div key={i} style={{ fontSize: '10px', color: '#ccc' }}>
            {i}: {el.tag} {el.class && `.${el.class}`} {el.id && `#${el.id}`}
          </div>
        ))}
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <strong>Z-Index Stack:</strong>
        {diagnostics.zIndexInfo.map((info, i) => (
          <div key={i} style={{ 
            fontSize: '10px', 
            color: info.pointerEvents === 'none' ? '#ff0000' : '#00ff00' 
          }}>
            {info.tagName} z:{info.zIndex} pos:{info.position} ptr:{info.pointerEvents}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button 
          onClick={runDiagnostics}
          style={{
            background: '#0066cc',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Refresh
        </button>
        
        <button 
          onClick={testHeaderClick}
          style={{
            background: '#cc6600',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Test Click
        </button>
        
        <button 
          onClick={forceFixHeader}
          style={{
            background: '#cc0000',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Force Fix
        </button>
      </div>
    </div>
  );
};

export default HeaderDiagnostic;