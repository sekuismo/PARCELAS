import React, { useState } from 'react';
import FormComponent from './Components/FormComponent';
import PlotComponent from './Components/PlotComponent';
import HeaderComponent from './Components/HeaderComponent';

const App = () => {
  const [plotSize, setPlotSize] = useState(0); // tamaño de la parcela en m²
  const [subdivisions, setSubdivisions] = useState(0); // número de subparcelas
  const [cost, setCost] = useState(0); // costo de las cercas en pesos chilenos
  const [imageData, setImageData] = useState(null); // datos de la imagen de la parcela

  const calculateCost = (plotSize, subdivisions) => {
    const fenceCostPerMeter = 100; // costo de la cerca por metro (ejemplo)
    
    // Tamaño de cada subparcela
    const subPlotSize = plotSize / subdivisions;
    
    // Perímetro de cada subparcela
    const subPlotSide = Math.sqrt(subPlotSize);
    const subPlotPerimeter = subPlotSide * 4;

    // Costo total basado en el perímetro de todas las subparcelas
    const totalCost = subPlotPerimeter * fenceCostPerMeter * subdivisions;
    return totalCost;
  };

  const handleCalculate = (plotSize, subdivisions) => {
    setPlotSize(plotSize);
    setSubdivisions(subdivisions);
    const cost = calculateCost(plotSize, subdivisions);
    setCost(cost);
  };

  return (
    <div className="container-fluid">
      <HeaderComponent />
      <FormComponent onCalculate={handleCalculate} />
      <PlotComponent 
        plotSize={plotSize} 
        subdivisions={subdivisions} 
        cost={cost} 
        setImageData={setImageData}
      />
      <div className="row">
        <div className="col-12 text-center">
          {/* {imageData && <img src={imageData} alt="Parcela Generada" />} */}
        </div>
      </div>
    </div>
  );
};

export default App;
