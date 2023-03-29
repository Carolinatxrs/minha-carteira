import styled from "styled-components";

interface ILegendProps {
  color: string;
}

//mesma estilização do MessageBox
export const Container = styled.div`
    width: 48%;
    height: 260px;

    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;
    
    display: flex;
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;

  > h2 {
    margin-bottom: 20px;
  }
`;

export const LegendContainer = styled.ul`
  list-style: none;

  //scroll para legendas
  height: 170px;
  padding-right: 15px;
  overflow-y: scroll;

  /* personalizando o scroll bar */
  ::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.tertiary};
    }
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  /* espaço entre as legendas */
  margin-bottom: 7px;

  > div {
    background-color: ${props => props.color};
    
    //box da legenda
    width: 40px;
    height: 40px;
    border-radius: 5px;

    //tamanho e alinhamento do números
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  //texto
  > span {
      margin-left: 5px;
    }
`;

export const SideRight = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
`;