const translate = {
  detailedInventory: {
    exportAs: "Exporteren als",
    emailPolicyholder: "E-mail verzekeringnemer",
    searchPlaceHolder: "Artikelbeschrijving, Kamer, Categorie",
    column: {
      item: "Artikel #",
      room: "Kamer",
      originalDescription: "Originele beschrijving",
      age: "Leeftijd",
      quantity: "Hoeveelheid",
      totalPrice: "Totale prijs",
      category: "Categorie",
      status: "Toestand",
      individualLimit: "Individuele limiet",
      replacementDescription: "Vervangingsbeschrijving",
      source: "Bron",
      replacementCost: "Vervangingskosten",
      replacementExposure: "Vervangingsbelichting",
      annualDep: "Jaarlijkse daling%",
      depreciation$: "Afschrijving $",
      cashExposure: "Blootstelling aan contanten",
      maxRecoverableDepreciation: "Max. Terugvorderbare afschrijving",
      itemOverage: "Artikeloverschot",
      settlementExposure: "Blootstelling aan schikkingen",
      comments: "Opmerking(en)",
      holdoverPaid: "Overschot betaald",
      amountPaid: "Betaald bedrag",
      holdoverDue: "Overschot verschuldigd",
    },
  },
  coverageSummary: {
    title: "Dekkingsoverzicht",
    exportText: "Exporteren naar PDF",
    columns: {
      category: "Categorie",
      aggregateLimit: "Totale limiet",
      itemLimit: "Artikellimiet",
      itemsClaimed: "# Artikelen geclaimd",
      itemsOverLimit: "# Artikelen boven limiet",
      totalReplacementCost: "Totale vervangingskosten",
      totalACV: "Totaal ACV",
      totalOverage: "Totale overschrijding",
      totalCashExposure: "Totale contante blootstelling",
      totalHoldoverPaid: "Totaal betaald restant",
      totalSettlementValue: "Totale schikkingswaarde",
    },
  },
  policyholderPayouts: {
    title: "Betalingsoverzicht",
    exportText: "Exporteren naar PDF",
    totalofitems: "Totaal aantal artikelen",
    totalitemspaidcashfor: "Totaal aantal artikelen waarvoor contant is betaald",
    totalitemsreplaced: "Totaal # items vervangen",
    total$paid: "Totaal $ betaald",
    columns: {
      paymentId: "Betalings-ID",
      paymentAmount: "Te betalen bedrag",
      paymentDate: "Betaaldatum",
      paymentMode: "Betaalmethode",
      referenceCheck: "Referentie / Cheque #",
      note: "Opmerking",
      totalPaid: "Totaal betaald",
    },
    replacementCostTitle: "Vervangingskosten afrekening",
    totalReplacementCost: "Totale vervangingskosten (inclusief belastingen)",
    totalReceiptValue: "Totale ontvangstwaarde (inclusief belastingen)",
    totalHoldoverPaid: "Totaal betaalde restant (inclusief belastingen)",
    lessPolicyDeductible: "Minder eigen risico (-)",
    netReplacementCost: "Netto vervangingskosten",
    actualCashTitle: "Vervangingskosten afrekening",
    itemsCashed: "Artikelen geïnd",
    actualTotalReplacementCost: "Totale vervangingskosten",
    lessDepreciationCost: "Min afschrijvingskosten (-)",
    lessAmountOverLimit: "Minder bedrag boven limiet (-)",
    actualLessPolicyDeductible: "Minder eigen risico (-)",
    netClaimCost: "Nettoclaimkosten",
  },
};

export { translate };

export type contentsEvaluationTranslateType = typeof translate;
