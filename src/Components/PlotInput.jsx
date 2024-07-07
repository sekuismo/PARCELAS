

const PlotInput = ({ onChange }) => (
    <div className="col-lg-4 col-sm-12 py-4" >
        <label className="form-label" >Tamaño de la parcela (m²):</label>
        <input className="form-control" type="number" onChange={onChange} />
    </div>
);

export default PlotInput;
