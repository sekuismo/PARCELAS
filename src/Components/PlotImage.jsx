import React from 'react';


const PlotImage = ({ plotSize, subdivisions }) => {
    const gridColumns = Math.ceil(Math.sqrt(subdivisions));
    const gridRows = Math.ceil(subdivisions / gridColumns);

    const plotStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '5px',
        width: '100%',
        height: '100%',
    };

    return (
        <div className="plot-container">
            <div id="plotCanvas" style={plotStyle}>
                {[...Array(subdivisions)].map((_, idx) => (
                    <div key={idx} className="subplot">
                        Subparcela {idx + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlotImage;
