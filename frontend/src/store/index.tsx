import React, {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import cookie from "react-cookies";

interface IState {
  isLogin: boolean;
  viewLog: string[];
}

type TAction =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "SAVE_LOG"; viewLog: string[] };

type TDispatch = Dispatch<TAction>;

const StateContext = createContext<IState | null>(null);
const DispatchContext = createContext<TDispatch | null>(null);

function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, isLogin: true };
    }
    case "LOGOUT": {
      return { ...state, isLogin: false };
    }
    case "SAVE_LOG": {
      return { ...state, viewLog: action.viewLog };
    }
    default: {
      console.log("context 에러");
      return state;
    }
  }
}

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    viewLog: [],
  });

  const getAccessToken = useCallback(async () => {
    try {
      const response = await axios.post("/auth/refresh");
      console.log("getAccessToken: ", response.data);
      axios.defaults.headers.common["Authorization"] = response.data;
    } catch (error) {
      dispatch({ type: "LOGOUT" });
      console.log("getAccessToken error", error);
    }
  }, []);
  useEffect(() => {
    // initial Setting
    const token = cookie.load("rNADACI4MAoJb5C");
    const authorization = axios.defaults.headers.common["Authorization"];
    console.log("hey refresh-token! :", typeof token);
    console.log("hey access-token! :", typeof authorization);

    let baseUrl = "http://localhost:5000/api";
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = baseUrl;

    if (token !== undefined && authorization === undefined) {
      dispatch({ type: "LOGIN" });
      // 새로고침
      getAccessToken();
    }
  }, []);

  useEffect(() => {
    if (state.isLogin) {
      const tokenInterval = 3500000;
      const refreshInterval = setInterval(() => {
        getAccessToken().then(() => {
          console.log("refreshed accessToken!");
          dispatch({ type: "LOGIN" });
        });
      }, tokenInterval);

      return () => {
        clearInterval(refreshInterval);
      };
    }
  }, [state.isLogin]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export function useContextState() {
  const state = useContext(StateContext);
  if (!state) throw new Error("Cannot find useContextState"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useContextDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error("Cannot find useContextDispatch"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
