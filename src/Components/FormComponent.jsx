import React, { useState } from 'react';

const FormComponent = ({ onCalculate }) => {
    const [plotSize, setPlotSize] = useState('');
    const [subdivisions, setSubdivisions] = useState('');

    const handleCalculate = () => {
        const size = parseFloat(plotSize);
        const subd = parseInt(subdivisions, 10);
        if (!isNaN(size) && !isNaN(subd)) {
            onCalculate(size, subd);
        }
    };

    return (
        <div className="row">
            <div className="col-lg-4 col-sm-12 py-4">
                <label className="form-label">Tamaño de la parcela (m²):</label>
                <input 
                    className="form-control" 
                    type="number" 
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)} 
                />
            </div>
            <div className="col-lg-4 col-sm-12 py-4">
                <label className="form-label">Número de subparcelas:</label>
                <input 
                    className="form-control" 
                    type="number" 
                    value={subdivisions}
                    onChange={(e) => setSubdivisions(e.target.value)} 
                />
            </div>
            <div className="col-lg-4 col-sm-12 py-4">
                <button className="btn btn-primary w-100" onClick={handleCalculate}>
                    Calcular
                </button>
            </div>
        </div>
    );
};

export default FormComponent;
