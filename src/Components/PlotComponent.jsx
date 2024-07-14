import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';

const PlotComponent = ({ plotSize, subdivisions, cost, subPlotSize, costPerSubPlot, setImageData }) => {
    useEffect(() => {
        if (plotSize > 0 && subdivisions > 0) {
            generateImage();
        }
    }, [plotSize, subdivisions]);

    const generateImage = () => {
        const element = document.getElementById("plotCanvas");
        if (element) {
            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                setImageData(imgData);
            });
        }
    };

    // Encuentra los factores más cercanos para determinar el layout de las subparcelas
    const findClosestFactors = (num) => {
        let root = Math.floor(Math.sqrt(num));
        let lowerFactor = root;
        while (num % lowerFactor !== 0 && lowerFactor > 1) {
            lowerFactor--;
        }
        let upperFactor = num / lowerFactor;
        if (lowerFactor > upperFactor) {
            return { columns: lowerFactor, rows: upperFactor };
        } else {
            return { columns: upperFactor, rows: lowerFactor };
        }
    };

    const { columns, rows } = findClosestFactors(subdivisions);

    const plotWidth = 1200; // Ancho del contenedor de la parcela
    const plotHeight = 500; // Altura del contenedor de la parcela
    const gap = 6; // Espacio entre subparcelas, representando caminos

    const subplotWidth = (plotWidth - (columns - 1) * gap) / columns;
    const subplotHeight = (plotHeight - (rows - 1) * gap) / rows;

    const plotStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: `${gap}px`,
        width: `${plotWidth}px`,
        height: `${plotHeight}px`,
        border: '1px solid black',
        margin: 'auto'
    };

    const subplotStyle = {
        border: '1px solid gray',
        backgroundColor: '#fff', // Color de las subparcelas
        width: `${subplotWidth}px`,
        height: `${subplotHeight}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const roadStyle = {
        backgroundColor: '#ccc', // Color de los caminos
        width: '100%',
        height: '100%'
    };

    return (
        <div className="text-center">
            <h5>Costo de las cercas: ${cost.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} CLP</h5>
            <p>Tamaño de cada subparcela: {subPlotSize.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} m²</p>
            <p>Costo de cercar cada subparcela: ${costPerSubPlot.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} CLP</p>
            <div className="plot-container" id="plotCanvas" style={plotStyle}>
                {[...Array(subdivisions)].map((_, idx) => (
                    <div key={idx} className="subplot" style={subplotStyle}>
                        <div style={roadStyle}>Subparcela {idx + 1}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlotComponent;
