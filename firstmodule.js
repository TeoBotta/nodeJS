//El 'exports' hace que los métodos y propiedades sean válidos fuera del módulo
exports.diaHoraActuales = function () {
    return Date();
};

//Para importar un módulo, se declara una variable y se llama al módulo en su asignación
//Ej: dt = require('./nombre_modulo');