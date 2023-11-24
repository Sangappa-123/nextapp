"use client";

import GenericSelect from "../GenericSelect/index";

export default function SelectCheckBox(props: { options: any }) {
  return <GenericSelect isMulti options={props.options} isManditaory={false} />;
}
