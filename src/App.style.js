import styled, { createGlobalStyle } from 'styled-components';
import { Card } from 'antd';

export const GlobalStyles = createGlobalStyle`
/********** Add Your Global CSS Here **********/

body {
  -webkit-overflow-scrolling: touch;
}

html h1,
html h2,
html h3,
html h4,
html h5,
html h6,
html a,
html p,
html li,
input,
textarea,
span,
div,
html,
body,
html a {
  margin-bottom: 0;
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: normal
}

html ul {
  -webkit-padding-start: 0px;
  list-style: none;
  margin-bottom: 0;
}
html, body,
  #root{
    height: 100%;
  }
`;

export const AppStyles = styled.div`
  height: 100%;
  padding: 30px;
  .button {
    text-align: right;
    margin-bottom: 20px;
  }
`;
export const NoRecord = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const TodoCard = styled(Card)`
  background: ${(props) => props.background};
  .ant-card-head {
    .ant-card-head-title {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
    }
  }
  .ant-card-body {
    div {
      line-height: 1.5;
    }
    .time-remain {
      margin-top: 10px;
      span {
        font-weight: 600;
      }
    }
  }
`;
