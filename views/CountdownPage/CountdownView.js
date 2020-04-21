import "./countdown.css";
import React from "react";
import { FullView, MorePanel } from "../../tab-utils/views/FullViewWrapper";
import BigText from "../BigText";
import News from "../News";
import { SettingsView } from "../../tab-utils/TabSettings/SettingsView";
import { preset_concept_name } from "./preset_concept_name";

export default CountdownView;

function CountdownView() {
  return (
    <>
      <FullView>
        <BigText
          id={"countdown-container"}
          content_on_top={null}
          top_line_content={<Counter />}
        />
      </FullView>

      <MorePanel>
        <SettingsView preset_concept_name={preset_concept_name} />
        <News preset_concept_name={preset_concept_name} />
      </MorePanel>
    </>
  );
}

function Counter() {
  return (
    <div>
      <div id="top-text" />
      <div id="center-text" />
    </div>
  );
}
