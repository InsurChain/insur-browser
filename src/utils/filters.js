var filters = {};

filters.toFixed = function( value ){
    value = Number( value );
    return value.toFixed(6);
}

export default filters;