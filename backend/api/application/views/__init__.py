from .test import router

# when there are multiple routers here export the whole thing as one router

'''
from ninja import Router

from .test import router as router_1
from .test2 import router as router_2
from .test3 import router as router_3

router = Router()

router.add_router("", router_1)
router.add_router("", router_2)
router.add_router("", router_3)

'''
# the unified router must be added to the api/url.py file 
__all__ = [
    "router"
]