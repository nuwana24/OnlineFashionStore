import styled from 'styled-components';
import '../App.css';

export const CartButtonContainer = styled.button`
    text-transform:capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid var(--lightBlue);
    border-color: ${props => (props.Cart? "var(--mainYellow)" : "var(--lightBlue)")};
    color: ${props => (props.Cart? "var(--mainYellow)" : "var(--lightBlue)")};
    border-radius: 05rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
    &:hover{
        background: ${props => (props.Cart? "var(--mainYellow)" : "var(--lightBlue)")};
        color: var(--mainBlue);
    }
    &:focus{
    outline: none;
    }
`
export const ReviewButtonContainer = styled.button`
    text-transform:capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid var(--reviewColour);
    border-color: "var(--reviewColour)"};
    color: "var(--reviewColour)"};
    border-radius: 05rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
    &:hover{
        background: var(--reviewColourLight);
        color: var(--reviewColour);
    }
    &:focus{
    outline: none;
    }
`