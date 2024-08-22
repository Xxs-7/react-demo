import React, { useState } from "react";
import Section from "./section";
import { DateInput, TimeInput } from "./input";
import Select from "./select";

export default function BasicComponent() {
  return (
    <div>
      <h2>BasicComponent</h2>
      <Section>
        <h3>date input</h3>
        <DateInput />
      </Section>
      <Section>
        <h3>time input</h3>
        <TimeInput />
      </Section>
      <Section>
        <h3>select</h3>
        <Select />
      </Section>
    </div>
  );
}
