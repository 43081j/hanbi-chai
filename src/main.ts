/// <reference types="chai" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      called: Chai.Assertion;
      callCount(count: number): Chai.Assertion;
      calledWith(...args: unknown[]): Chai.Assertion;
      returned(val: unknown): Chai.Assertion;
    }
  }
}

const plugin: Chai.ChaiPlugin = (chai) => {
  const Assertion = chai.Assertion;
  const assertIsStub = (obj: unknown) => {
    if (
      typeof obj === 'object' &&
      obj !== null &&
      obj.hasOwnProperty('original') &&
      obj.hasOwnProperty('handler')
    ) {
      return;
    }

    throw new TypeError('Object was not a valid stub');
  };

  Assertion.addProperty('called', function called(this: Chai.AssertionStatic) {
    assertIsStub(this._obj);
    this.assert(
      this._obj.called === true,
      'expected #{this} to have been called',
      'expected #{this} not to have been called',
      true,
      this._obj.called
    );
  });

  Assertion.addMethod(
    'callCount',
    function callCount(this: Chai.AssertionStatic, count: number): void {
      assertIsStub(this._obj);
      this.assert(
        this._obj.callCount === count,
        'expected #{this} to have been called #{exp} times but ' +
          'was called #{act} times',
        'expected #{this} not to have been called #{exp} times',
        count,
        this._obj.callCount
      );
    }
  );

  Assertion.addMethod(
    'calledWith',
    function calledWith(this: Chai.AssertionStatic, ...args: unknown[]): void {
      assertIsStub(this._obj);
      const result = this._obj.calledWith(...args);
      this.assert(
        result,
        'expected #{this} to have been called with #{exp}',
        'expected #{this} not to have been called with #{exp}',
        true,
        result
      );
    }
  );

  Assertion.addMethod(
    'returned',
    function returned(this: Chai.AssertionStatic, val: unknown): void {
      assertIsStub(this._obj);
      const result = this._obj.returned(val);
      this.assert(
        result,
        'expected #{this} to have returned #{exp}',
        'expected #{this} not to have returned #{exp}',
        true,
        result
      );
    }
  );
};

export default plugin;
