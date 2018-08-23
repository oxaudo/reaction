import { mount } from "enzyme"
import React from "react"
import { ContextConsumer } from "../"
import { buildClientApp } from "../buildClientApp"

describe("buildClientApp", () => {
  it("resolves with a <ClientApp /> component", async () => {
    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    const wrapper = mount(<ClientApp />)
    expect(wrapper.html()).toContain("<div>Hello Router</div>")
  })

  it("accepts an initial route", async () => {
    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/cv",
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    const wrapper = mount(<ClientApp />)
    expect(wrapper.html()).toContain("<div>CV Page</div>")
  })

  it("bootstraps data from __RELAY_BOOTSTRAP__", async () => {
    window.__RELAY_BOOTSTRAP__ = JSON.stringify([
      ["cacheKey", "found window cache"],
    ])

    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    const wrapper = mount(<ClientApp />)
    expect(
      (wrapper
        .find("Boot")
        .props() as any).system.relayEnvironment.relaySSRMiddleware.cache.values()
    ).toContain("found window cache")
  })

  it("passes along initial context values", async done => {
    const HomeApp = () => {
      return (
        <ContextConsumer>
          {({ system }) => {
            expect(Object.keys(system)).toEqual([
              "history",
              "routes",
              "context",
              "currentUser",
              "relayEnvironment",
              "resolver",
            ])
            expect(Object.keys(system.context)).toEqual(["mediator", "user"])
            setImmediate(done)
            return <div />
          }}
        </ContextConsumer>
      )
    }

    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: HomeApp,
        },
      ],
      context: {
        mediator: jest.fn(),
        user: {
          id: "foo",
          accessToken: "bar",
        },
      },
    })

    mount(<ClientApp />)
  })
})
