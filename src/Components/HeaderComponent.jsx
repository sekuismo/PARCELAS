import React from "react";

function HeaderComponent() {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="display-4 text-center">Divide tu parcela!</h1>
      </div>
      <div className="col-12 text-center">
        <p>
          Ingresa el tamaño de tu parcela en metros cuadrados para saber cuanto
          te costará cercar cada una de las parcelas
        </p>
        <p>
          El número máximo de subparcelas está limitado por el tamaño total de
          la parcela y el espacio necesario para caminos que permitan el acceso
          a vehículos en ambos sentidos. Cada subparcela tendrá un mínimo 100 m²
          y los caminos tendrán un ancho de 6 metros.
        </p>
      </div>
    </div>
  );
}

export default HeaderComponent;
