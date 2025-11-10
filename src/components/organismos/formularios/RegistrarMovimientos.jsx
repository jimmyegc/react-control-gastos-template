import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Switch } from "@mui/material";
import {
  useMovimientosStore,
  useCategoriasStore,
  useOperaciones,
  ListaGenerica,
  Selector,
  InputNumber,
  InputText,
  useCuentaStore,
  v,
  BtnSave,
} from "../../../index";

// 🔧 helper para combinar refs (RHF + local)
function mergeRefs(...refs) {
  return (el) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(el);
      else r.current = el;
    });
  };
}

export function RegistrarMovimientos({ setState, state, dataSelect, accion }) {
  const dateInputRef = useRef(null);
  const { cuentaItemSelect } = useCuentaStore();
  const { datacategoria, categoriaItemSelect, selectCategoria } = useCategoriasStore();
  const { tipo } = useOperaciones();
  const { insertarMovimientos, editarMovimientos } = useMovimientosStore();
  const [estado, setEstado] = useState(dataSelect?.estado !== "0");
  const [stateCategorias, setStateCategorias] = useState(false);
  const fechaactual = dataSelect?.fecha
  ? new Date(dataSelect.fecha)
  : new Date();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const registerFecha = register("fecha", { required: true });

  const insertar = async (data) => {
    const estadoText = estado ? 1 : 0;

    const p = {
      tipo,
      estado: estadoText,
      fecha: data.fecha,
      descripcion: data.descripcion,
      id_cuenta: cuentaItemSelect.id,
      valor: parseFloat(data.monto),
      id_categoria: categoriaItemSelect.id,
    };

    try {
      if (accion === "Editar") {
        await editarMovimientos(dataSelect.id, p);
      } else {
        await insertarMovimientos(p);
      }
      setState();
    } catch (err) {
      alert(err);
    }
  };

  const estadoControl = (e) => setEstado(e.target.checked);

  useEffect(() => {
    if (accion === "Editar" && dataSelect?.categoria && datacategoria?.length > 0) {
      const categoriaEncontrada = datacategoria.find(
        (cat) => cat.descripcion === dataSelect.categoria
      );
      if (categoriaEncontrada) selectCategoria(categoriaEncontrada);
    }
  }, [accion, dataSelect, datacategoria]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    };
  }, []);

  return (
    <Container onClick={setState}>
      <div
        className="sub-contenedor"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="encabezado">
          <h1>
            {accion} {tipo === "i" ? "ingreso" : "gasto"}
          </h1>
          <span onClick={setState}>{<v.iconocerrar />}</span>
        </div>

        <form onSubmit={handleSubmit(insertar)} className="formulario">
          <section>
            <div>
              <label>Monto:</label>
              <InputNumber
                defaultValue={dataSelect.valor}
                register={register}
                placeholder="Ingrese monto"
                errors={errors}
                icono={<v.iconocalculadora />}
              />
            </div>

            <ContainerFuepagado>
              <span>{<v.iconocheck />}</span>
              <label>Fue pagado:</label>
              <Switch
                onChange={estadoControl}
                checked={estado}
                color="warning"
              />
            </ContainerFuepagado>

            <ContainerFecha>
              <label>Fecha:</label>
              <div className="fecha-wrapper">
                <input
                  type="date"
                  defaultValue={fechaactual.toJSON().slice(0, 10)}
                  {...(() => {
                    const { ref, ...rest } = registerFecha;
                    return rest;
                  })()}
                  ref={mergeRefs(dateInputRef, registerFecha.ref)}
                />
                <v.iconocalendario
                  className="calendar-icon"
                  onClick={() => {
                    if (dateInputRef.current?.showPicker) {
                      dateInputRef.current.showPicker();
                    } else {
                      dateInputRef.current?.focus();
                    }
                  }}
                />
              </div>
              {errors.fecha?.type === "required" && <p>El campo es requerido</p>}
            </ContainerFecha>

            <div>
              <label>Descripción:</label>
              <InputText
                defaultValue={dataSelect.descripcion}
                register={register}
                placeholder="Ingrese una descripción"
                errors={errors}
                style={{ textTransform: "capitalize" }}
              />
            </div>

            <ContainerCategoria>
              <label>Categoría: </label>
              <Selector
                color="#e14e19"
                texto1={categoriaItemSelect?.icono}
                texto2={categoriaItemSelect?.descripcion}
                funcion={() => setStateCategorias(!stateCategorias)}
              />
            </ContainerCategoria>
          </section>

          {stateCategorias && (
            <ListaGenerica
              bottom="0px"
              scroll="auto"
              setState={() => setStateCategorias(!stateCategorias)}
              data={datacategoria}
              funcion={selectCategoria}
            />
          )}

          <div className="contentBtnSave">
            <BtnSave
              titulo="Guardar"
              bgcolor="#DAC1FF"
              icono={<v.iconoguardar />}
              className="btnsave"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  color: black;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    color: ${({ theme }) => theme.text};
    position: relative;

    label {
      font-weight: 550;
    }
    .encabezado {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 1.25rem;
        font-weight: 500;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        cursor: pointer;
        color: ${({ theme }) => theme.colorSubtitle};
        transition: transform 0.2s ease, color 0.2s ease;
        padding: 0.25rem;

        &:hover {
          color: ${({ theme }) => theme.text};
          transform: scale(1.1);
        }

        &:active {
          opacity: 0.8;
          transform: scale(1);
        }
      }
    }

    .formulario {
      .contentBtnSave {
        padding-top: 20px;
        display: flex;
        justify-content: center;
      }
      section {
        padding-top: 20px;
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

const ContainerFuepagado = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ContainerCategoria = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ContainerFecha = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .fecha-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    input[type="date"] {
      appearance: none;
      color: ${({ theme }) => theme.text};
      font-family: "Helvetica", arial, sans-serif;
      font-size: 17px;
      border: none;
      background: ${({ theme }) => theme.bgtotal};
      padding: 4px 30px 4px 4px;
      width: 140px;
      cursor: pointer;

      &::-webkit-calendar-picker-indicator {
        opacity: 0;
        display: none;
      }

      &:focus {
        outline: 0;
      }
    }

    .calendar-icon {
      position: absolute;
      right: 8px;
      color: #2196f3; /* azul moderno */
      font-size: 1.3rem;
      cursor: pointer;
      transition: transform 0.2s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
