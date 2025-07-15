import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TheaterVisualization = ({ selectedMovie, onSeatSelect, selectedSeats, aiRecommendations }) => {
  const [viewMode, setViewMode] = useState('2d'); // '2d' or '3d'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Mock theater layout data
  const theaterData = {
    name: "CineAI Premium Theater 1",
    screenType: "IMAX",
    totalSeats: 180,
    rows: [
      { id: 'A', seats: 12, type: 'premium', price: 25.99 },
      { id: 'B', seats: 14, type: 'premium', price: 25.99 },
      { id: 'C', seats: 16, type: 'standard', price: 18.99 },
      { id: 'D', seats: 16, type: 'standard', price: 18.99 },
      { id: 'E', seats: 18, type: 'standard', price: 18.99 },
      { id: 'F', seats: 18, type: 'standard', price: 18.99 },
      { id: 'G', seats: 18, type: 'standard', price: 18.99 },
      { id: 'H', seats: 20, type: 'economy', price: 14.99 },
      { id: 'I', seats: 20, type: 'economy', price: 14.99 },
      { id: 'J', seats: 18, type: 'economy', price: 14.99 }
    ]
  };

  // Generate seat availability (mock data)
  const generateSeatAvailability = () => {
    const availability = {};
    theaterData.rows.forEach(row => {
      for (let i = 1; i <= row.seats; i++) {
        const seatId = `${row.id}${i}`;
        availability[seatId] = {
          available: Math.random() > 0.3, // 70% availability
          type: row.type,
          price: row.price,
          accessibility: i <= 2 && ['H', 'I', 'J'].includes(row.id),
          aiRecommended: aiRecommendations.includes(seatId)
        };
      }
    });
    return availability;
  };

  const [seatAvailability] = useState(generateSeatAvailability());

  const handleSeatClick = (seatId) => {
    if (!seatAvailability[seatId].available) return;
    onSeatSelect(seatId, seatAvailability[seatId]);
  };

  const getSeatClassName = (seatId) => {
    const seat = seatAvailability[seatId];
    const isSelected = selectedSeats.includes(seatId);
    const isHovered = hoveredSeat === seatId;
    
    let baseClass = "w-6 h-6 rounded-t-lg border-2 cursor-pointer transition-all duration-200 relative ";
    
    if (!seat.available) {
      baseClass += "bg-gray-400 border-gray-500 cursor-not-allowed ";
    } else if (isSelected) {
      baseClass += "bg-accent border-accent-foreground shadow-lg scale-110 ";
    } else if (seat.aiRecommended) {
      baseClass += "bg-green-400 border-green-500 shadow-md animate-pulse ";
    } else if (isHovered) {
      baseClass += "bg-primary/20 border-primary scale-105 ";
    } else {
      switch (seat.type) {
        case 'premium':
          baseClass += "bg-amber-200 border-amber-400 hover:bg-amber-300 ";
          break;
        case 'standard':
          baseClass += "bg-blue-200 border-blue-400 hover:bg-blue-300 ";
          break;
        case 'economy':
          baseClass += "bg-gray-200 border-gray-400 hover:bg-gray-300 ";
          break;
      }
    }
    
    return baseClass;
  };

  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-cinematic">
      {/* Theater Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{theaterData.name}</h3>
          <p className="text-sm text-muted-foreground">{theaterData.screenType} • {theaterData.totalSeats} seats</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === '2d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('2d')}
          >
            2D View
          </Button>
          <Button
            variant={viewMode === '3d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('3d')}
          >
            3D View
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleZoom('out')}>
            <Icon name="ZoomOut" size={16} />
          </Button>
          <span className="text-sm text-muted-foreground px-2">{Math.round(zoomLevel * 100)}%</span>
          <Button variant="outline" size="sm" onClick={() => handleZoom('in')}>
            <Icon name="ZoomIn" size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span>AI Recommended</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-accent rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>

      {/* Theater Layout */}
      <div className="relative overflow-hidden bg-gray-900 rounded-lg p-4" style={{ height: '400px' }}>
        {/* Screen */}
        <div className="w-full h-4 bg-gradient-to-r from-gray-700 via-gray-300 to-gray-700 rounded-t-lg mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t-lg"></div>
          <div className="text-center text-xs text-white mt-1">SCREEN</div>
        </div>

        {/* Seats Layout */}
        <div 
          className="transform-gpu transition-transform duration-300"
          style={{ 
            transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
            transformOrigin: 'center top'
          }}
        >
          {theaterData.rows.map((row, rowIndex) => (
            <div key={row.id} className="flex justify-center items-center mb-2 relative">
              {/* Row Label */}
              <div className="w-6 text-center text-white text-sm font-medium mr-2">
                {row.id}
              </div>
              
              {/* Seats */}
              <div className="flex space-x-1">
                {Array.from({ length: row.seats }, (_, seatIndex) => {
                  const seatNumber = seatIndex + 1;
                  const seatId = `${row.id}${seatNumber}`;
                  const seat = seatAvailability[seatId];
                  
                  return (
                    <div
                      key={seatId}
                      className={getSeatClassName(seatId)}
                      onClick={() => handleSeatClick(seatId)}
                      onMouseEnter={() => setHoveredSeat(seatId)}
                      onMouseLeave={() => setHoveredSeat(null)}
                      title={`${seatId} - $${seat.price} (${seat.type})`}
                    >
                      {/* Seat Number */}
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {seatNumber}
                      </span>
                      
                      {/* AI Recommendation Badge */}
                      {seat.aiRecommended && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      
                      {/* Accessibility Icon */}
                      {seat.accessibility && (
                        <Icon name="Accessibility" size={8} className="absolute -bottom-1 -right-1 text-blue-600" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Row Label (Right) */}
              <div className="w-6 text-center text-white text-sm font-medium ml-2">
                {row.id}
              </div>
            </div>
          ))}
        </div>

        {/* Seat Hover Info */}
        {hoveredSeat && (
          <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
            <div className="text-sm font-medium">Seat {hoveredSeat}</div>
            <div className="text-xs text-muted-foreground">
              ${seatAvailability[hoveredSeat].price} • {seatAvailability[hoveredSeat].type}
            </div>
            {seatAvailability[hoveredSeat].aiRecommended && (
              <div className="text-xs text-green-600 mt-1">
                <Icon name="Sparkles" size={12} className="inline mr-1" />
                AI Recommended
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pricing Legend */}
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-amber-200 border border-amber-400 rounded"></div>
          <span>Premium $25.99</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
          <span>Standard $18.99</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded"></div>
          <span>Economy $14.99</span>
        </div>
      </div>
    </div>
  );
};

export default TheaterVisualization;