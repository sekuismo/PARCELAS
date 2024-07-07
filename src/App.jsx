import {useState, useEffect } from 'react';
import SubdivisionInput from './Components/SubdivisionInput';
import CostDisplay from './Components/CostDisplay';
import PlotImage from './Components/PlotImage';
import PlotInput from './Components/PlotInput';
import html2canvas from 'html2canvas';
import HeaderComponent from './Components/HeaderComponent';

const App = () => {
    const [plotSize, setPlotSize] = useState(0); // tamaño de la parcela en m²
    const [subdivisions, setSubdivisions] = useState(0); // número de subparcelas
    const [cost, setCost] = useState(0); // costo de las cercas en pesos chilenos
    const [imageData, setImageData] = useState(null); // datos de la imagen de la parcela

    const calculateCost = (plotSize, subdivisions) => {
        const fenceCostPerMeter = 100; // costo de la cerca por metro (ejemplo)
        const perimeter = Math.sqrt(plotSize) * 4; // perímetro de la parcela
        const totalCost = perimeter * fenceCostPerMeter * subdivisions;
        return totalCost;
    };

    const handlePlotSizeChange = (e) => {
        setPlotSize(e.target.value);
    };

    const handleSubdivisionChange = (e) => {
        setSubdivisions(e.target.value);
        const cost = calculateCost(plotSize, e.target.value);
        setCost(cost);
    };

    const generateImage = () => {
        const element = document.getElementById('plotCanvas');
        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            setImageData(imgData);
        });
    };

    useEffect(() => {
        generateImage();
    }, [plotSize, subdivisions]);

    return (
        <div>
            <HeaderComponent/>
            <PlotInput onChange={handlePlotSizeChange} />
            <SubdivisionInput onChange={handleSubdivisionChange} />
            <CostDisplay cost={cost} />
            <PlotImage plotSize={plotSize} subdivisions={subdivisions} />
            {imageData && <img src={imageData} alt="Parcela Generada" />}
        </div>
    );
};

export default App;
