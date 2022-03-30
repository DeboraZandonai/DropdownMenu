import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black100};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const Button = styled.button`
  outline: none;
	border: 0;
  background: ${({ theme }) => theme.colors.black400};
	cursor: pointer;
`;

export const ContainerOption = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 50px;
`;

export const ButtonOption = styled.button`
  outline: none;
	border: 0;
	height: 35px;
	padding-right: 30px;
	text-align: start;
	color: ${({ theme }) => theme.colors.white100};;
  background: ${({ theme }) => theme.colors.black400};
	cursor: pointer;

	::placeholder {
		background: ${({ theme }) => theme.colors.blue100};
	}
	
	:focus {
		background: ${({ theme }) => theme.colors.blue100};
	}
`;



