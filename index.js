const CTX = require('./milagro-crypto-js');

const curve = 'BN254';
const ctx = new CTX(curve);

export const setup = () => {
  // Set generator of G1
  const G1 = new ctx.ECP(0);
  const x = new ctx.BIG(0);
  const y = new ctx.BIG(0);

  x.rcopy(ctx.ROM_CURVE.CURVE_Gx);
  y.rcopy(ctx.ROM_CURVE.CURVE_Gy);
  G1.setxy(x, y);

  // Set generator of G2
  const G2 = new ctx.ECP2(0);
  const qx = new ctx.FP2(0);
  const qy = new ctx.FP2(0);
  x.rcopy(ctx.ROM_CURVE.CURVE_Pxa);
  y.rcopy(ctx.ROM_CURVE.CURVE_Pxb);
  qx.bset(x, y);
  x.rcopy(ctx.ROM_CURVE.CURVE_Pya);
  y.rcopy(ctx.ROM_CURVE.CURVE_Pyb);
  qy.bset(x, y);
  G2.setxy(qx, qy);

  // Set order of G
  const order = new ctx.BIG(0);
  order.rcopy(ctx.ROM_CURVE.CURVE_Order);

  return {
    G1,
    G2,
    order,
    ctx,
  };
};

const AUTHORITY_KEY = {
  x: new ctx.BIG(42),
  y: new ctx.BIG(314),
};

export const keygen = (x = AUTHORITY_KEY.x, y = AUTHORITY_KEY.y) => {
  const { G2 } = setup();

  const pub2x = G2.mul(x);
  const pub2y = G2.mul(y);

  return {
    private: AUTHORITY_KEY,
    public: {
      G2,
      x: pub2x,
      y: pub2y,
    },
  };
};

