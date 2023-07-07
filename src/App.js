import "./App.css";
import {
  CreateNote,
  NavBar,
  NoteUICollection,
  UpdateNote,
} from "./ui-components";
import { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";

function App({ signOut }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);

  return (
    <div className="App">
      <NavBar
        width="100%"
        marginBottom="20px"
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true) },
          Button31632487: {
            onClick: async () => {
              await DataStore.clear();
              await signOut();
            },
          },
        }}
      />
      <div className="container">
        <NoteUICollection
          overrideItems={({ item, idx }) => {
            return {
              overrides: {
                EditButton: {
                  onClick: () => {
                    setShowUpdateModal(true);
                    setUpdateNote(item);
                  },
                },
              },
            };
          }}
        />
      </div>
      <div className="modal">
        <CreateNote
          display={showCreateModal || "none"}
          overrides={{
            MyIcon: { as: "button", onClick: () => setShowCreateModal(false) },
          }}
        />
      </div>
      <div className="modal">
        <UpdateNote
          note={updateNote}
          display={showUpdateModal || "none"}
          overrides={{
            MyIcon: { as: "button", onClick: () => setShowUpdateModal(false) },
          }}
        />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
