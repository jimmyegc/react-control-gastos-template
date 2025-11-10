import { create } from "zustand";
import {
  MostrarMovimientosPorMesAño,
  InsertarMovimientos,
  EliminarMovimientos,
  RptMovimientosPorMesAño,
} from "../index";

export const useMovimientosStore = create((set, get) => ({
  datamovimientos: [],
  dataRptMovimientosAñoMes: [],
  totalMesAño: 0,
  totalMesAñoPagados: 0,
  totalMesAñoPendientes: 0,
  parametros: {},
  mostrarMovimientos: async (p) => {
    const response = await MostrarMovimientosPorMesAño(p);
    set({ parametros: p });
    const { calcularTotales } = get();
    calcularTotales(response);
    set({ datamovimientos: response });
    return response;
  },
  calcularTotales: (response = []) => {
    let total = 0;
    let totalPagados = 0;
    let totalPendientes = 0;

    for (const item of response) {
      const monto = Object.values(item)[2];
      total += monto;      
      //console.log("estado:" + typeof item.estado + " monto:" + monto);
      if (item.estado == 1) totalPagados += monto;
      else if (item.estado == 0) totalPendientes += monto;
    }
    
    /*console.log("totalPendientes", totalPendientes);
    console.log("totalPagados", totalPagados);
    console.log("total", total); */ 

    set({
      totalMesAño: total,
      totalMesAñoPagados: totalPagados,
      totalMesAñoPendientes: totalPendientes,
    });
  },
  insertarMovimientos: async (p) => {    
    await InsertarMovimientos(p);
    const { mostrarMovimientos } = get();
    const { parametros } = get();
    set(mostrarMovimientos(parametros));
  },
  eliminarMovimiento: async (p) => {
    await EliminarMovimientos(p);
    const { parametros } = get();
    const { mostrarMovimientos } = get();
    set(mostrarMovimientos(parametros));
  },
  rptMovimientosAñoMes: async (p) => {
    const response = await RptMovimientosPorMesAño(p);
    set({ dataRptMovimientosAñoMes: response });
    return response;
  },
}));
