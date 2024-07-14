import React, { useState } from 'react';

const FormComponent = ({ onCalculate }) => {
    const [plotSize, setPlotSize] = useState('');
    const [subdivisions, setSubdivisions] = useState('');
    const [maxSubdivisions, setMaxSubdivisions] = useState(0);
    const [fenceType, setFenceTypeLocal] = useState('polines'); // Default to polines impregnados

    const handlePlotSizeChange = (e) => {
        const size = parseFloat(e.target.value);
        if (!isNaN(size)) {
            setPlotSize(size);
            const minSubplotSize = 100; // m² de área útil por subparcela
            const roadWidth = 6; // Ancho de la carretera en metros
            const roadArea = roadWidth * Math.sqrt(size); // Asumiendo un camino principal que cruza toda la parcela
            const effectivePlotSize = size - roadArea; // Área restante después de los caminos
            const effectiveSubplotSize = minSubplotSize; // Ajuste basado en la necesidad de caminos internos
            const calculatedMaxSubdivisions = Math.floor(effectivePlotSize / effectiveSubplotSize);
            setMaxSubdivisions(calculatedMaxSubdivisions);
        } else {
            setPlotSize('');
            setMaxSubdivisions(0);
        }
    };

    const handleCalculate = () => {
        const subd = parseInt(subdivisions, 10);
        if (!isNaN(plotSize) && !isNaN(subd) && subd >= 1 && subd <= maxSubdivisions) {
            onCalculate(plotSize, subd, fenceType); // Pasa el tipo de cerca seleccionado
        } else {
            alert(`Por favor, asegúrate de que el número de subparcelas esté entre 1 y ${maxSubdivisions}.`);
        }
    };

    return (
        <div className="row">
            <div className="col-lg-3 col-sm-12 py-4">
                <label className="form-label">Tamaño de la parcela (m²):</label>
                <input 
                    className="form-control" 
                    type="number" 
                    value={plotSize}
                    onChange={handlePlotSizeChange}
                />
            </div>
            <div className="col-lg-3 col-sm-12 py-4">
                <label className="form-label">Número de subparcelas (Máximo: {maxSubdivisions}):</label>
                <input 
                    className="form-control" 
                    type="number" 
                    min="1" max={maxSubdivisions}
                    value={subdivisions}
                    onChange={(e) => setSubdivisions(e.target.value)}
                />
            </div>
            <div className="col-lg-3 col-sm-12 py-4">
                <label className="form-label">Tipo de Cerca:</label>
                <select className=" form-select" value={fenceType} onChange={(e) => setFenceTypeLocal(e.target.value)}>
                    <option value="polines">Polines Impregnados ($19.500 el metro)</option>
                    <option value="puas">Alambre de Púas ($13.600 el metro)</option>
                    <option value="malla">Malla Bizcocho ($10.900 el metro)</option>
                </select>
            </div>
            <div className="col-lg-3 col-sm-12 ">
                <button className="btn btn-primary w-100" onClick={handleCalculate}>
                    Calcular
                </button>
            </div>
        </div>
    );
};

export default FormComponent;
