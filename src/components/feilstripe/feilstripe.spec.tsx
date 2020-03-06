import React from "react";
import { shallow } from "enzyme";
import Feilstripe from "./feilstripe";

describe("feilstripe", () => {
  it("Skal vise min melding", () => {
    const component = shallow(
      <Feilstripe>
        <p>Melding</p>
      </Feilstripe>
    );
    expect(component.text()).toContain("Melding");
  });
});
