import React from "react";

function HeaderComponent() {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="display-3 text-center">Divide tu parcela!</h1>
      </div>
      <div className="col-12 text-center">
        <p>Ingresa el tamaño de tu parcela en metros cuadrados para saber cuanto te costará cercar cada una de las parcelas</p>
      </div>
    </div>
  );
}

export default HeaderComponent;
