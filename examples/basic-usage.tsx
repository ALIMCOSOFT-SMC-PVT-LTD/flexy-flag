import React from 'react';
import { Flag } from 'flexi-flags';

export function BasicUsageExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic Usage Examples</h2>
      
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
        <Flag code="US" size="32px" />
        <Flag code="GB" size="32px" />
        <Flag code="CA" size="32px" />
        <Flag code="DE" size="32px" />
        <Flag code="FR" size="32px" />
      </div>

      <h3>Different Shapes</h3>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <Flag code="US" shape="rectangle" size="48px" />
          <p>Rectangle</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Flag code="US" shape="square" size="48px" />
          <p>Square</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Flag code="US" shape="circle" size="48px" />
          <p>Circle</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Flag code="US" shape="rounded" size="48px" />
          <p>Rounded</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Flag code="US" shape="pill" size="48px" />
          <p>Pill</p>
        </div>
      </div>

      <h3>Different Aspect Ratios</h3>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <Flag code="JP" ratio="3:2" width="72px" />
          <p>3:2</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Flag code="JP" ratio="1:1" size="48px" />
          <p>1:1</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Flag code="JP" ratio="4:3" width="64px" />
          <p>4:3</p>
        </div>
      </div>

      <h3>Custom Styling</h3>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Flag 
          code="IN" 
          size="48px" 
          style={{ 
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            border: '2px solid #333'
          }} 
        />
        <Flag 
          code="BR" 
          size="48px" 
          shape="circle"
          style="border: 3px solid #FFD700; box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);"
        />
      </div>
    </div>
  );
}