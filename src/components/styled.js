import styled from 'styled-components';

export const ExampleAppWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 12px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const WidgetWrapper = styled.div`
  width: 400px;
  height: 600px;

  background-color: rgb(240, 240, 240);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 12px;
`;

export const PocketWrapper = styled.div`
  height: 80px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;

  background-color: ${props => props.bg};
`;

export const Input = styled.input`
  height: 50px;
  width: 100%;
  border: 0;
  padding: 12px;
  font-size: 24px;
  text-align: right;
  background-color: transparent;
  &:focus {
    outline: 0;
  }
`;
