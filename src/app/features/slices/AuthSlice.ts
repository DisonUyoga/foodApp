import { Tables } from "@/src/database.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

interface SessionProps {
  session: Session | null;
}
interface LoadingProps {
  authLoading: boolean;
}
interface ProfileProps {
  profile: Tables<"profiles"> | null;
}
interface AdminProps {
  isAdmin: boolean;
}
interface StateProps
  extends SessionProps,
    LoadingProps,
    ProfileProps,
    AdminProps {}
const initialState: StateProps = {
  session: null,
  authLoading: false,
  profile: null,
  isAdmin: true,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionToken(state: SessionProps, action: PayloadAction<SessionProps>) {
      const { session } = action.payload;

      state.session = session;
    },
    processingAuth(state, action: PayloadAction<LoadingProps>) {
      const { authLoading } = action.payload;
      state.authLoading = authLoading;
    },
    setProfileData(state, action: PayloadAction<ProfileProps>) {
      const { profile } = action.payload;
      state.profile = profile;
    },
    setAdmin(state, action: PayloadAction<AdminProps>) {
      const { isAdmin } = action.payload;
      state.isAdmin = isAdmin;
    },
  },
});

export const { sessionToken, processingAuth, setProfileData, setAdmin } =
  AuthSlice.actions;

export default AuthSlice.reducer;
