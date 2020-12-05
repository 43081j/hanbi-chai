import {expect, use, AssertionError} from 'chai';
import hanbiChai from '../main';
import * as hanbi from 'hanbi';

use(hanbiChai);

describe('main', () => {
  let spy: hanbi.Stub<(...args: unknown[]) => unknown>;

  beforeEach(() => {
    spy = hanbi.spy();
  });

  describe('called', () => {
    it('should fail assertion if stub was not called', () => {
      expect(() => {
        expect(spy).to.have.been.called;
      }).to.throw(AssertionError);
    });

    it('should pass assertion if stub was called', () => {
      spy.handler();

      expect(() => {
        expect(spy).to.have.been.called;
      }).not.to.throw();
    });

    it('should fail assertion if non-stub', () => {
      expect(() => {
        expect({}).to.have.been.called;
      }).to.throw(TypeError);
    });
  });

  describe('not.called', () => {
    it('should pass assertion if stub was not called', () => {
      expect(() => {
        expect(spy).not.to.have.been.called;
      }).not.to.throw();
    });

    it('should fail assertion if stub was called', () => {
      spy.handler();

      expect(() => {
        expect(spy).not.to.have.been.called;
      }).to.throw(AssertionError);
    });
  });

  describe('callCount', () => {
    it('should fail assertion if non-stub', () => {
      expect(() => {
        expect({}).to.have.callCount(1);
      }).to.throw(TypeError);
    });

    it('should fail assertion if call count is not equal to value', () => {
      expect(() => {
        expect(spy).to.have.callCount(1);
      }).to.throw(AssertionError);
    });

    it('should pass assertion if call count is equal to value', () => {
      spy.handler();
      spy.handler();

      expect(() => {
        expect(spy).to.have.callCount(2);
      }).not.to.throw();
    });
  });

  describe('not.callCount', () => {
    it('should fail assertion if call count is equal to value', () => {
      spy.handler();

      expect(() => {
        expect(spy).not.to.have.callCount(1);
      }).to.throw(AssertionError);
    });

    it('should pass assertion if call count is not equal to value', () => {
      expect(() => {
        expect(spy).not.to.have.callCount(1);
      }).not.to.throw();
    });
  });

  describe('calledWith', () => {
    it('should fail assertion if non-stub', () => {
      expect(() => {
        expect({}).to.have.been.calledWith('foo');
      }).to.throw(TypeError);
    });

    it('should fail assertion if not called with value', () => {
      expect(() => {
        expect(spy).to.have.been.calledWith('foo');
      }).to.throw(AssertionError);
    });

    it('should pass assertion if call count is equal to value', () => {
      spy.handler('foo');

      expect(() => {
        expect(spy).to.have.been.calledWith('foo');
      }).not.to.throw();
    });
  });

  describe('not.calledWith', () => {
    it('should fail assertion if called with args', () => {
      spy.handler('foo', 'bar');

      expect(() => {
        expect(spy).not.to.have.been.calledWith('foo', 'bar');
      }).to.throw(AssertionError);
    });

    it('should pass assertion if not called with args', () => {
      expect(() => {
        expect(spy).not.to.have.been.calledWith('foo', 'bar');
      }).not.to.throw();
    });
  });

  describe('returned', () => {
    it('should fail assertion if non-stub', () => {
      expect(() => {
        expect({}).to.have.returned('foo');
      }).to.throw(TypeError);
    });

    it('should fail assertion if never returned value', () => {
      expect(() => {
        expect(spy).to.have.returned('foo');
      }).to.throw(AssertionError);
    });

    it('should pass assertion if call count is equal to value', () => {
      spy.returns('foo');
      spy.handler();

      expect(() => {
        expect(spy).to.have.returned('foo');
      }).not.to.throw();
    });
  });

  describe('not.returned', () => {
    it('should fail assertion if returned value', () => {
      spy.returns('foo');
      spy.handler();

      expect(() => {
        expect(spy).not.to.have.returned('foo');
      }).to.throw(AssertionError);
    });

    it('should pass assertion if never returned value', () => {
      expect(() => {
        expect(spy).not.to.have.returned('foo');
      }).not.to.throw();
    });
  });
});
