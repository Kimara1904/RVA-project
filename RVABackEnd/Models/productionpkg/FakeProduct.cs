using productionpkg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RVABackEnd.Models.productionpkg
{
	public class FakeProduct : Product
	{
		public FakeProduct()
		{
			Type = "";
			ProductivityPoints = 0;
		}

		~FakeProduct()
		{

		}
	}
}