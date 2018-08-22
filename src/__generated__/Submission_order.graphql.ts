/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ItemReview_artwork$ref } from "./ItemReview_artwork.graphql";
import { ShippingAndPaymentDetails_order$ref } from "./ShippingAndPaymentDetails_order.graphql";
import { TransactionSummary_order$ref } from "./TransactionSummary_order.graphql";
declare const _Submission_order$ref: unique symbol;
export type Submission_order$ref = typeof _Submission_order$ref;
export type Submission_order = {
    readonly id: string | null;
    readonly code: string | null;
    readonly lineItems: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly artwork: ({
                    readonly id: string;
                    readonly " $fragmentRefs": ItemReview_artwork$ref;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $fragmentRefs": TransactionSummary_order$ref & ShippingAndPaymentDetails_order$ref;
    readonly " $refType": Submission_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Submission_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "code",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TransactionSummary_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShippingAndPaymentDetails_order",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lineItems",
      "storageKey": null,
      "args": null,
      "concreteType": "OrderLineItemConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "OrderLineItemEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "OrderLineItem",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    v0,
                    {
                      "kind": "FragmentSpread",
                      "name": "ItemReview_artwork",
                      "args": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "__id",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                v1
              ]
            }
          ]
        }
      ]
    },
    v1
  ]
};
})();
(node as any).hash = 'bd0e2493065931b528bb30c049e387e7';
export default node;
