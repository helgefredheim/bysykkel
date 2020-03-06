import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Stasjonstabell from "./stasjonstabell";
import Tekster from "../../tekster";
import stationInformation from "../../mock/station_information";
import stationStatus from "../../mock/station_status";
import { BeriketStasjon } from "../../types/types";
import berikStasjoner from "../../utils/berikStasjoner";

describe("stasjonstabell", () => {
  let component: ReactWrapper;

  describe("Når det ikke finnes stativer", () => {
    beforeEach(() => {
      component = mount(<Stasjonstabell stasjoner={[]} />);
    });

    it("Skal vise en melding dersom det ikke finnes stasjoner", () => {
      expect(component.text()).toContain(Tekster.INGEN_BYSYKLER_MELDING);
    });

    it("Skal ikke vise en tabell", () => {
      expect(component.find("table")).toHaveLength(0);
    });
  });

  describe("Når det finnes stativer", () => {
    const stasjoner = stationInformation.data.stations;
    const stasjonsstatusliste = stationStatus.data.stations;
    const berikedeStasjoner: BeriketStasjon[] = berikStasjoner(
      stasjoner,
      stasjonsstatusliste
    );

    beforeEach(() => {
      component = mount(<Stasjonstabell stasjoner={berikedeStasjoner} />);
    });

    it("Skal vise en tabell", () => {
      expect(component.find("table")).toHaveLength(1);
    });

    it("Skal vise en tabellrad per stativ", () => {
      expect(component.find(".js-stasjonstabell__tr")).toHaveLength(4);
    });

    it("Skal default sortere listen alfabetisk etter stasjonsnavn", () => {
      const stasjonerAlfabetisk: string[] = [
        "Aker Brygge",
        "Borgenveien",
        "Professor Aschehougs plass",
        "Stortingstunellen"
      ];
      stasjonerAlfabetisk.forEach((stasjonsnavn: string, index: number) => {
        const text = component
          .find(".js-stasjonstabell__tr")
          .at(index)
          .text();
        expect(text).toContain(stasjonsnavn);
      });
    });

    it("Skal sortere listen alfabetisk i motsatt rekkefølge etter stasjonsnavn når man klikker på tittelen i kolonnen for stativ-navn", () => {
      const stasjonerAlfabetisk: string[] = [
        "Stortingstunellen",
        "Professor Aschehougs plass",
        "Borgenveien",
        "Aker Brygge"
      ];
      component.find("button.js-sorter-stasjonsnavn").simulate("click");
      stasjonerAlfabetisk.forEach((stasjonsnavn: string, index: number) => {
        const text = component
          .find(".js-stasjonstabell__tr")
          .at(index)
          .text();
        expect(text).toContain(stasjonsnavn);
      });
    });

    it("Skal sortere listen etter antall ledige låser når man klikker på tittelen i kolonnen for antall ledige låser", () => {
      const antallLedigeLaaser: number[] = [33, 24, 12, 10];
      component.find("button.js-sorter-antall_ledige_laaser").simulate("click");
      antallLedigeLaaser.forEach((antall: number, index: number) => {
        const text = component
          .find(".js-stasjonstabell__tr")
          .at(index)
          .text();
        expect(text).toContain(antall);
      });
    });

    it("Skal sortere listen etter antall ledige låser i motsatt rekkefølge når man klikker to ganger på tittelen i kolonnen for antall ledige låser", () => {
      const antallLedigeLaaser: number[] = [10, 12, 24, 33];
      component.find("button.js-sorter-antall_ledige_laaser").simulate("click");
      component.find("button.js-sorter-antall_ledige_laaser").simulate("click");
      antallLedigeLaaser.forEach((antall: number, index: number) => {
        const text = component
          .find(".js-stasjonstabell__tr")
          .at(index)
          .text();
        expect(text).toContain(antall);
      });
    });
  });
});
