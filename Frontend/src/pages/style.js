import styled from 'styled-components';


export const ModalContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 380px;
    max-height: 580px;
    gap: 1rem;
    background-color: #ECF2FF;
    position: fixed;
    right: 2em;
    bottom: 2em;
    @media screen and (max-width: 460PX) {
        right: .35rem;
        bottom: .5rem;
    }
    .close{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: flex-end;
        color: #333;
        font-size: 30px;
        width:95%;
        height: 10px;
        margin: 5px auto;
    }
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            height: 5rem;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        align-items: center;
        gap: 1rem;
        background-color: #fff;
        border-radius: 2rem;
        padding: 3rem 5rem;
        width: 90%;
        p{
          font-size: 14px;
          font-style: italic;
          margin: 0;
          padding: 0;
        }
        input{
          background-color: transparent;
          padding: 1rem;
          border: 0.1rem solid #4e0eff;
          border-radius: 0.4rem;
          color: #333;
          width: 100%;
          width: 18ch;
          font-size: 1rem;
          &:focus{
              border: .1rem solid #997af0;
              outline: none;
          }
        }
        textarea{
          width:17ch;
          overflow: auto;
          padding: 1rem;
          border: 0.1rem solid #4e0eff;
          border-radius: 0.4rem;
        }
        button{
            background-color: #4e0eff;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #00000096;
            }
        }
    }
`;

export const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 80vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
        color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
            height: 6rem;
            transition: 0.5s ease-in-out;
        }
        }
        .selected {
        border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
        background-color: #4e0eff;
        }
    }
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  border-radius: 0.5rem;
  height: 500px;
  margin-bottom: 10px;
  .container{
    background-color: #fff;
    width: 340px;
    border-radius: 0.5rem;
    display: grid;
    grid-template-columns: 25% 75%;
    margin: 0;
    padding: 0; 
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-columns: 35% 65%;
    }
  }
`;

export const ContactWrapper = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fff;
    margin: 0;
    padding: 0;
    border-right: solid 1px #ddd;
    border-radius: 0.5rem 0 0 0.5rem;
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: solid 1px #ddd;
      img {
        height: 5rem;
        margin: 0;
        padding: 3px 0;
      }
    }
    .contacts {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      background-color: #fff;
      align-items: center;
      overflow: auto;
      min-height: 355px;
      background-color: #ffffff39;
      gap: 0.8rem;
      padding-top: 0.3rem;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .contact {
        background-color: #ffffff34;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        .avatar-online {
          img {
            height: 3rem;
            border: 0.15rem solid lightgreen;
            border-radius: 50%;
          }
        }
        .avatar {
          img {
            height: 3rem;
            border-radius: 0.1rem;
          }
        }
        .username-online {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
          h3 {
            color: #333;
            font-size: 14px;
            margin: -8px;
          }
          p{
            color: lightgreen;
            font-style: italic;
            font-family: monospace;
          }
        }
        .username {
          h3 {
            color: #333;
            font-size: 14px;
          }
          p{
            color: #ddd;
            font-family: monospace;
            font-size: 14px;
          }
        }
      }
      .selected {
        border: solid 1px lightsteelblue;
      }
    }

    .current-user {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      border-top: solid 1px #ddd;
      padding-top: 10px;
      .avatar {
        margin: 0 5px 5px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          height: 2rem;
          max-inline-size: 100%;
          border: 0.15rem solid lightgreen;
          border-radius: 50%;
        }
        .username {
          h2 {
            font-size: 14px;
            color: #333;
          }
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
      }
    }
`;

export const WelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 10rem;
  }
  span {
    color: #4e0eff;
  }
  h3{
    font-family: serif;
    color: #333;
    font-size: 15px;
  }
`;

export const Chatty = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  max-height: 500px;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 10% 80% 10%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.6rem;
    background-color: #eee;
    z-index:10000;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #333;
          font-family: monospace;
          font-size: 16px;     
        }
      }
    }
  }
  .chat-messages {
    padding: 2.5rem .5rem;
    display: flex;
    flex-direction: column;
    gap: .3rem;
    overflow: auto;
    max-height: 400px;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: .3rem .8rem;
        font-size: .8rem;
        border-radius: .5rem;
        color: #333;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: lightsteelblue;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #eee;
      }
    }
  }
`;

export const InputWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: transparent;
  /* background-color: #080420; */
  /* padding: 0 .1rem; */
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffd740;
        margin-left: .2rem;
        background-color: #000;
        border-radius: 50%;
        border: .5px solid #ffd740;
        padding: 0;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 93%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background-color: #eee;
    border: solid 1px #ddd;
    margin-left: 1.0rem;
    input {
      width: 100%;
      height: 35px;
      background-color: transparent;
      color: #333;
      border: none;
      padding-left: 1rem;
      font-size: .8rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.1rem 1rem;
      margin-right: 0.25rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #81d4fa;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.1rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  background-color: #81d4fa;;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1rem;
    color: #fff;
  }
`;