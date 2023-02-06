import styled from 'styled-components';
   


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 100%;
    margin: 0 auto;
`


export const Box = styled.div`
    width: 20%;
    margin-top: -8px;
    display:'flex';
    flex-direction: 'column';
    flex-wrap: 'wrap';
    justify-content: center;
    align-items: center;
`;

export const Boxmini = styled.div`
    background-color: #fff;
    color: #333;
    font-family: "Josefin Sans", sans-serif, Roboto,   Helvetica, Arial,   sans-serif;;
    bottom: 0;
    width: 80%;
    border-radius: 10px;
    padding: 2px 25px;
    margin: 10px;
    box-shadow: 0 5px 15px rgba(135, 206, 235, 0.5);
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover{   
    opacity: 1;
    box-shadow: 0 1px 2px rgba(135, 206, 235, 0.2);
    -webkit-transform: scale(0.98, 0.98);
    transform: scale(0.98, 0.99);
    cursor: pointer;
    }
`;

export const MySlide = styled.div`
  width: 60%;
`;
   
   
