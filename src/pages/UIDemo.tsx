/**
 * @fileoverview Demo page showcasing UI components
 * @project     Steroid Guide Site (v0.0.0)
 * @module      pages/UIDemo.tsx
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2024 Steroid Guide
 */

import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
} from "../components/ui";

export default function UIDemo() {
  return (
    <div className="container p-8 mx-auto space-y-8">
      <h1 className="mb-8 text-3xl font-bold">UI Components Demo</h1>

      <section className="space-y-4">
        <h2 className="mb-4 text-2xl font-semibold">Alerts</h2>

        <Alert variant="info" title="Information" dismissible>
          This is an informational alert with an icon and dismiss button.
        </Alert>

        <Alert variant="warning" title="Important Safety Notice">
          Always consult with a healthcare provider before starting any cycle.
        </Alert>

        <Alert variant="success" title="Success" dismissible>
          Your profile has been updated successfully.
        </Alert>

        <Alert variant="error" title="Error" dismissible>
          There was an error processing your request. Please try again.
        </Alert>
      </section>

      <section className="space-y-4">
        <h2 className="mb-4 text-2xl font-semibold">Tooltips</h2>

        <Card>
          <CardHeader title="Tooltip Positions" />
          <CardContent>
            <div className="flex items-center justify-center h-48 gap-8">
              <Tooltip content="This tooltip appears on top" position="top">
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                  Top
                </button>
              </Tooltip>

              <Tooltip
                content="This tooltip appears on the right"
                position="right"
              >
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                  Right
                </button>
              </Tooltip>

              <Tooltip
                content="This tooltip appears on the bottom"
                position="bottom"
              >
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                  Bottom
                </button>
              </Tooltip>

              <Tooltip
                content="This tooltip appears on the left"
                position="left"
              >
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                  Left
                </button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Tooltip Examples" />
          <CardContent>
            <p className="text-lg leading-relaxed">
              When administering{" "}
              <Tooltip content="A synthetic hormone that promotes muscle growth">
                <span className="underline cursor-help">anabolic steroids</span>
              </Tooltip>
              , it's crucial to follow proper{" "}
              <Tooltip content="The specific timing, frequency, and method of administration">
                <span className="underline cursor-help">dosing protocols</span>
              </Tooltip>
              . This includes understanding{" "}
              <Tooltip content="The rate at which a drug is processed and eliminated from the body">
                <span className="underline cursor-help">half-life</span>
              </Tooltip>{" "}
              and{" "}
              <Tooltip content="The practice of combining multiple compounds">
                <span className="underline cursor-help">stacking</span>
              </Tooltip>
              .
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
