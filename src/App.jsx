import React, { useState } from "react";
import FormComponent from "./Components/FormComponent";
import PlotComponent from "./Components/PlotComponent";
import HeaderComponent from "./Components/HeaderComponent";

const App = () => {
  const [plotSize, setPlotSize] = useState(0); // tamaño de la parcela en m²
  const [subdivisions, setSubdivisions] = useState(0); // número de subparcelas
  const [cost, setCost] = useState(0); // costo de las cercas en pesos chilenos
  const [fenceType, setFenceType] = useState('polines'); // tipo de cerca
  const [imageData, setImageData] = useState(null); // datos de la imagen de la parcela
  const [subPlotSize, setSubPlotSize] = useState(0); // tamaño de cada subparcela
  const [costPerSubPlot, setCostPerSubPlot] = useState(0); // costo por cada subparcela

  const calculateCost = (plotSize, subdivisions, fenceType) => {
    let fenceCostPerMeter;
    switch(fenceType) {
      case 'polines':
        fenceCostPerMeter = 19500;
        break;
      case 'puas':
        fenceCostPerMeter = 13600;
        break;
      case 'malla':
        fenceCostPerMeter = 10900;
        break;
      default:
        fenceCostPerMeter = 100; // Default cost
    }

    // Tamaño de cada subparcela
    const subPlotSize = plotSize / subdivisions;

    // Perímetro de cada subparcela
    const subPlotSide = Math.sqrt(subPlotSize);
    const subPlotPerimeter = subPlotSide * 4;

    // Costo total basado en el perímetro de todas las subparcelas
    const totalCost = subPlotPerimeter * fenceCostPerMeter * subdivisions;
    const costPerSubPlot = subPlotPerimeter * fenceCostPerMeter;
    
    return { totalCost, subPlotSize, costPerSubPlot };
  };

  const handleCalculate = (plotSize, subdivisions, fenceType) => {
    setPlotSize(plotSize);
    setSubdivisions(subdivisions);
    setFenceType(fenceType);
    const { totalCost, subPlotSize, costPerSubPlot } = calculateCost(plotSize, subdivisions, fenceType);
    setCost(totalCost);
    setSubPlotSize(subPlotSize);
    setCostPerSubPlot(costPerSubPlot);
  };

  return (
    <div className="container-fluid">
      <HeaderComponent />
      <FormComponent
        onCalculate={handleCalculate}
        setFenceType={setFenceType}
      />
      <PlotComponent
        plotSize={plotSize}
        subdivisions={subdivisions}
        cost={cost}
        subPlotSize={subPlotSize}
        costPerSubPlot={costPerSubPlot}
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
