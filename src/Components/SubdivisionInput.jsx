

const SubdivisionInput = ({ onChange }) => (
    <div className="col-lg-4 col-sm-12 py-4">
        <label className="form-label" >Número de subparcelas:</label>
        <input className="form-control" type="number" onChange={onChange} />
    </div>
);

export default SubdivisionInput;
