import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};

    padding: 25px;

    /* mantendo o aside e header fixo na rolagem 
    ** 70px se refere ao header (Layout) */
    height: calc(100vh -70px);
    overflow: scroll;
`;