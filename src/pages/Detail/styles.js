import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  max-width: 550px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 10px;
      color: #000;
    }

    > div {
      padding: 16px 0;

      span {
      font-size: 18px;
      font-weight: bold;
      margin: 5px 0 20px;
      color: #333;
    }

      p {
        font-size: 15px;
        line-height: 20px;
        color: #666;
        margin-top: 5px;
      }
    }

    button {
      background: #7159c1;
      color: #fff;
      height: 50px;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, "#7159c1")};
      }

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
