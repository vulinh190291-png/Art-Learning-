package org.hyjava.hyall.sci.service;

import org.hyjava.hyall.sci.pojo.Sci;
import org.hyjava.hyall.sci.pojo.dto.SciDTO;
import org.hyjava.hyall.sci.repository.SciRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SciService  implements ISciService{
    @Autowired
    SciRepository sciRepository;

    @Override
    public Sci addSci(SciDTO sci) {
        Sci nSci = new Sci();
        BeanUtils.copyProperties(sci, nSci);
        return sciRepository.save(nSci);
    }

    @Override
    public void deleteSci(Integer cartItemId) {
        sciRepository.deleteById(cartItemId);
    }

    @Override
    public Sci updateSci(SciDTO Sci) {
        Integer cartItemId = Sci.getCartItemId();
        Sci nsci = sciRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("没有这个东西" + cartItemId));
        BeanUtils.copyProperties(Sci, nsci);
        return sciRepository.save(nsci);
    }

    @Override
    public Sci querySci(Integer cartItemId) {
        return sciRepository.findById(cartItemId).get();
    }
}
